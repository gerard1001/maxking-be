import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user_role.dto';
import { UpdateUserRoleDto } from './dto/update-user_role.dto';
import { UserRole } from './models/user_role.model';
import { UserRoleRepository } from './providers/user_role.repository';
import { UserRepository } from '../user/providers/user.repository';
import { RoleRepository } from '../role/providers/role.repository';

@Injectable()
export class UserRoleService {
  constructor(
    private readonly userRoleRepo: UserRoleRepository,
    private readonly userRepo: UserRepository,
    private readonly roleRepo: RoleRepository,
  ) {}

  async create(createUserRoleDto: CreateUserRoleDto): Promise<UserRole> {
    try {
      const { userId, roleId } = createUserRoleDto;
      const user = await this.userRepo.findById(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const role = await this.roleRepo.findById(roleId);
      if (!role) {
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
      }
      const userRole = await this.userRoleRepo.findByUserAndRole(
        roleId,
        userId,
      );
      if (userRole) {
        throw new HttpException(
          'User-Role relation already exists',
          HttpStatus.CONFLICT,
        );
      }
      return await this.userRoleRepo.create(createUserRoleDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<UserRole[]> {
    try {
      return await this.userRoleRepo.findAll();
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      return await this.userRoleRepo.findById(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    try {
      return `This action updates a #${id} userRole`;
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteOne(id: string): Promise<any> {
    try {
      return await this.userRoleRepo.deleteOne(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
