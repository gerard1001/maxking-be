import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthHelper {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwt(payload: any): Promise<string> {
    try {
      return await this.jwtService.signAsync(payload);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async decodeToken(token: string): Promise<any> {
    try {
      return this.jwtService.decode(token);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
