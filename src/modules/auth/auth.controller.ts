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
  SetMetadata,
  Param,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { IResponse, IToken } from 'src/core/interfaces/response.interface';
import { User } from '../user/model/user.model';
import { GoogleAuthGuard } from 'src/core/guards/google-auth.guard';
import { ValidationPipe } from 'src/core/pipes/validation.pipe';
import {
  changePasswordValidation,
  createUserValidation,
  resetPasswordValidation,
  userRegisterValidation,
} from 'src/core/validations/user.validation';
import { UserAuthGuard } from 'src/core/guards/auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './dto/forgot-pwd.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe(userRegisterValidation))
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

  @Post('create-user')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: false,
    roles: [ENUM_ROLE_TYPE.SUPER_ADMIN, ENUM_ROLE_TYPE.ADMIN],
  })
  @UsePipes(new ValidationPipe(createUserValidation))
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IResponse<User>> {
    try {
      return this.authService.createUser(createUserDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('verify/:token')
  async verifyEmail(@Req() req: Request) {
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
    return;
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req: any, @Res() res: any) {
    return this.authService.googleLogin(req, res);
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<IResponse<string>> {
    try {
      return this.authService.forgotPassword(forgotPasswordDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('reset-password/:token')
  @UsePipes(new ValidationPipe(resetPasswordValidation))
  async resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<IResponse<string>> {
    try {
      return this.authService.resetPassword(token, resetPasswordDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('change-password')
  @UseGuards(UserAuthGuard)
  @UsePipes(new ValidationPipe(changePasswordValidation))
  async changePassword(
    @Req() req: Request,
    @Body() changePasswordPasswordDto: ChangePasswordDto,
  ): Promise<IResponse<string>> {
    try {
      return this.authService.changePassword(req, changePasswordPasswordDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
