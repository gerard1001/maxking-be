import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthHelper } from '../helpers/auth.helper';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    @Inject(forwardRef(() => AuthHelper))
    private readonly authHelper: AuthHelper,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token: string = this.extractToken(request);

    console.log('Token', token);

    if (!token) {
      throw new HttpException('Please login to proceed', HttpStatus.FORBIDDEN);
    }

    try {
      const payload = await this.authHelper.decodeJwtToken(token);
      request['user'] = payload;
      console.log('************', payload);
    } catch (error) {
      console.log(error);
      throw new HttpException('Invalid signin token', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
