import {
  Injectable,
  HttpException,
  HttpStatus,
  ExecutionContext,
  CanActivate,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthHelper } from '../helpers/auth.helper';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private readonly authHelper: AuthHelper) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new HttpException('Please login to proceed', HttpStatus.FORBIDDEN);
    }

    try {
      const payload = await this.authHelper.decodeJwtToken(token);
      request['user'] = payload;
    } catch {
      throw new HttpException('Invalid signin token', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
