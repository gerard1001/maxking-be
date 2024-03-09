import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './model/user.model';
import { UserRepository } from './providers/user.repository';
import { IResponse } from 'src/core/interfaces/response.interface';
import { DeleteUsersDto } from './dto/delete-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async findAll(): Promise<IResponse> {
    try {
      const users = await this.userRepo.findAll();
      return {
        status: HttpStatus.OK,
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

  async findById(id: string): Promise<IResponse> {
    try {
      const user = await this.userRepo.findById(id);
      return {
        status: HttpStatus.OK,
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

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return `This action updates a #${id} user`;
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteOne(id: string): Promise<IResponse> {
    try {
      const count = await this.userRepo.deleteOne(id);
      return {
        status: HttpStatus.OK,
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

  async deleteMultiple(deleteUsersDto: DeleteUsersDto): Promise<IResponse> {
    try {
      const count = await this.userRepo.deleteMultiple(deleteUsersDto.ids);
      return {
        status: HttpStatus.OK,
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
