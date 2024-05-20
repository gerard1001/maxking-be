import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './model/user.model';
import { UserRepository } from './providers/user.repository';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { DeleteUsersDto } from './dto/delete-user.dto';
import { AuthHelper } from 'src/core/helpers/auth.helper';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly authHelper: AuthHelper,
  ) {}

  async findAll(req: any): Promise<IResponse<User[]>> {
    try {
      const excludedRoles = [];

      const loggedInUser = await this.findById(req?.user?.id);
      if (!loggedInUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const userRoles = loggedInUser.data.roles.map((role) => role.type);
      if (userRoles.includes(ENUM_ROLE_TYPE.SUPER_ADMIN)) {
        excludedRoles.push(ENUM_ROLE_TYPE.SUPER_ADMIN);
      } else if (userRoles.includes(ENUM_ROLE_TYPE.ADMIN)) {
        excludedRoles.push(ENUM_ROLE_TYPE.SUPER_ADMIN, ENUM_ROLE_TYPE.ADMIN);
      } else if (userRoles.includes(ENUM_ROLE_TYPE.MANAGER)) {
        excludedRoles.push(
          ENUM_ROLE_TYPE.SUPER_ADMIN,
          ENUM_ROLE_TYPE.ADMIN,
          ENUM_ROLE_TYPE.MANAGER,
        );
      }
      const users = await this.userRepo.findAll(excludedRoles);
      return {
        statusCode: HttpStatus.OK,
        message: 'Users retrieved successfully',
        data: users,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllFree(): Promise<IResponse<User[]>> {
    try {
      const users = await this.userRepo.findAllFree();
      return {
        statusCode: HttpStatus.OK,
        message: 'Users retrieved successfully',
        data: users,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<IResponse<User>> {
    try {
      const user = await this.userRepo.findById(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'User retrieved successfully',
        data: user,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userRepo.findByEmail(email);
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByToken(token: string): Promise<IResponse<User>> {
    try {
      const decodedToken = await this.authHelper.decodeJwtToken(token);
      if (!decodedToken)
        throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
      const user = await this.userRepo.findById(decodedToken.id);
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      return {
        statusCode: HttpStatus.OK,
        message: 'User retrieved successfully',
        data: user,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IResponse<User>> {
    try {
      const {} = updateUserDto;
      const user = await this.userRepo.findById(id);
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      const newUser = await this.userRepo.update(id, updateUserDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully',
        data: newUser[1][0],
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatePublicDisplay(id: string): Promise<IResponse<User>> {
    try {
      const user = await this.userRepo.findById(id);
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      const newUser = await this.userRepo.update(id, {
        publicDisplay: !user.publicDisplay,
      });
      return {
        statusCode: HttpStatus.OK,
        message: `User ${newUser[1][0].publicDisplay ? 'set to ' : 'removed from '} public display`,
        data: newUser[1][0],
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteOne(id: string): Promise<IResponse<ICount>> {
    try {
      const user = await this.userRepo.findById(id);
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      const count = await this.userRepo.deleteOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully',
        data: { count },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteMultiple(
    deleteUsersDto: DeleteUsersDto,
  ): Promise<IResponse<ICount>> {
    try {
      const count = await this.userRepo.deleteMultiple(deleteUsersDto.ids);
      return {
        statusCode: HttpStatus.OK,
        message: 'User(s) deleted successfully',
        data: { count },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
