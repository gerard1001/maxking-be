import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserRepository } from '../user/providers/user.repository';
import { PasswordHelper } from 'src/core/helpers/password.helper';
import { UserRoleService } from '../user_role/user_role.service';
import { RoleRepository } from '../role/providers/role.repository';
import { IResponse, IToken } from 'src/core/interfaces/response.interface';
import { AuthHelper } from 'src/core/helpers/auth.helper';
import { User } from '../user/model/user.model';
import { ProfileRepository } from '../profile/providers/profile.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly roleRepo: RoleRepository,
    private readonly profileRepo: ProfileRepository,
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
      console.log(user);
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
      const token = await this.authHelper.generateJwtToken<{
        id: string;
      }>({
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

  // async googleLogin(data: any): Promise<any> {
  //   try {
  //     const user = await this.userRepo.findByEmail(data.email);

  //     if (!user) {
  //       console.log('User not found, creating user');
  //       const role = await this.roleRepo.findByType('CLIENT');
  //       if (!role) {
  //         throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
  //       }
  //       const newUser = await this.userRepo.register({
  //         firstName: data.firstName,
  //         lastName: data.lastName,
  //         email: data.email,
  //         password: null,
  //         isVerified: data.isVerified,
  //       });
  //       const token = await this.authHelper.generateJwtToken({
  //         id: newUser.id,
  //       });

  //       await this.userRoleService.create({
  //         userId: newUser.id,
  //         roleId: role.id,
  //       });

  //       console.log('User created successfully');
  //       console.log('Token:', token);
  //       console.log('User:', newUser);

  //       /* return {
  //         statusCode: HttpStatus.CREATED,
  //         message: 'User registered successfully (With Google)',
  //         data: {
  //           token,
  //         },
  //       }; */

  //       return newUser;
  //     }

  //     const token = await this.authHelper.generateJwtToken({
  //       id: user.id,
  //     });
  //     console.log('User logged in successfully');
  //     console.log('Token:', token);
  //     console.log('User:', user);

  //     return user;

  //     /* return {
  //       statusCode: HttpStatus.OK,
  //       message: 'User logged in successfully (With Google)',
  //       data: {
  //         token,
  //       },
  //     }; */
  //   } catch (error) {
  //     throw new HttpException(
  //       error.message || 'Server Error',
  //       error.status || HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  async googleLogin(req: any, res: any): Promise<IResponse<IToken>> {
    try {
      console.log('***********$$$$$$************');
      console.log(req.user);

      const { firstName, lastName, email, picture, isVerified } = req.user;

      const user = await this.userRepo.findByEmail(req.user?.email);

      if (!user) {
        console.log('User not found, creating user');
        console.log('Create user:', req.user.firstName);

        const role = await this.roleRepo.findByType('CLIENT');
        if (!role) {
          throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
        }
        const newUser = await this.userRepo.register({
          firstName,
          lastName,
          email,
          password: null,
          isVerified,
        });
        // await this.profileRepo.create({
        //   userId: newUser.id,
        //   picture,
        // });
        const token = await this.authHelper.generateJwtToken({
          id: newUser.id,
        });

        await this.userRoleService.create({
          userId: newUser.id,
          roleId: role.id,
        });

        console.log('User created successfully');
        console.log('Token:', token);
        console.log('User:', newUser);

        return {
          statusCode: HttpStatus.CREATED,
          message: 'User registered successfully (With Google)',
          data: {
            token,
          },
        };
      }

      const token = await this.authHelper.generateJwtToken({
        id: user.id,
      });
      console.log('User logged in successfully');
      console.log('Token:', token);
      console.log('User:', user);

      await res.redirect(`http://localhost:3000`);
      return {
        statusCode: HttpStatus.OK,
        message: 'User logged in successfully (With Google)',
        data: {
          token,
        },
      };
    } catch (error) {
      console.log('+++++++++++');
      console.log(error);
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
