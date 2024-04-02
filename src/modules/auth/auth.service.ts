import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserRepository } from '../user/providers/user.repository';
import { PasswordHelper } from 'src/core/helpers/password.helper';
import { UserRoleService } from '../user_role/user_role.service';
import { RoleRepository } from '../role/providers/role.repository';
import { IResponse, IToken } from 'src/core/interfaces/response.interface';
import { AuthHelper } from 'src/core/helpers/auth.helper';
import { User } from '../user/model/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly roleRepo: RoleRepository,
    private readonly userRoleService: UserRoleService,
    private readonly passwordHelper: PasswordHelper,
    private readonly authHelper: AuthHelper,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<IResponse<User>> {
    const { firstName, lastName, email, password } = createUserDto;
    const user = await this.userRepo.findByEmail(email);
    if (user) {
      throw new HttpException(
        `User: ${email} already exists`,
        HttpStatus.CONFLICT,
      );
    }
    const role = await this.roleRepo.findByType('CLIENT');
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    const newUser = await this.userRepo.register({
      firstName,
      lastName,
      email,
      password: await this.passwordHelper.hashPassword(password),
      isVerified: false,
    });

    await this.userRoleService.create({
      userId: newUser.id,
      roleId: role.id,
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: 'User registered successfully',
      data: newUser,
    };
  }

  async login(loginAuthDto: LoginAuthDto): Promise<IResponse<IToken>> {
    try {
      const { email, password } = loginAuthDto;
      const user = await this.userRepo.findByEmail(email);
      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      const isCorrectPassword = await this.passwordHelper.comparePassword(
        password,
        user.password,
      );
      if (!isCorrectPassword) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      if (user.isVerified === false) {
        throw new HttpException('User not verified', HttpStatus.UNAUTHORIZED);
      }
      const token = await this.authHelper.generateJwtToken({
        id: user.id,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'User logged in successfully',
        data: {
          token,
        },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
