import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserRepository } from '../user/providers/user.repository';
import { AuthRepository } from './providers/auth.repository';
import { PasswordHelper } from 'src/core/helpers/password.helper';
import { UserRoleService } from '../user_role/user_role.service';
import { RoleRepository } from '../role/providers/role.repository';
import { IResponse } from 'src/core/interfaces/response.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly roleRepo: RoleRepository,
    private readonly authRepo: AuthRepository,
    private readonly userRoleService: UserRoleService,
    private readonly passwordHelper: PasswordHelper,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<IResponse> {
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
    const newUser = await this.authRepo.register({
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
      status: HttpStatus.CREATED,
      message: 'User registered successfully',
      data: newUser,
    };
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
