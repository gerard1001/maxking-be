import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  UseGuards,
  Res,
  Req,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { IResponse, IToken } from 'src/core/interfaces/response.interface';
import { User } from '../user/model/user.model';
import { GoogleAuthGuard } from 'src/core/guards/google-auth.guard';
import { Request } from 'express';
import { ValidationPipe } from 'src/core/pipes/validation.pipe';
import { createUserValidation } from 'src/core/validations/user.validation';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe(createUserValidation))
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IResponse<User>> {
    try {
      return this.authService.register(createUserDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('verify/:token')
  async verifyEmail(@Req() req: Request) {
    console.log(req.params);
    return this.authService.verifyEmail(req);
  }

  @Post('/login')
  async login(@Body() loginAuthDto: LoginAuthDto): Promise<IResponse<IToken>> {
    try {
      return this.authService.login(loginAuthDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(): Promise<any> {
    return { msg: 'Google Auth' };
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req: any, @Res() res: any) {
    return this.authService.googleLogin(req, res);
  }

  @Get('status')
  user(@Req() request: Request) {
    console.log(request.user);
    if (request.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }
}
