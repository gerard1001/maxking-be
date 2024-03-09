import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ROLE_MODEL } from 'src/core/constants';
import { Role } from './model/role.model';

@Injectable()
export class RoleService {
  constructor(@Inject(ROLE_MODEL) private readonly roleRepo: typeof Role) {}

  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  async findAll(): Promise<Role[]> {
    try {
      return await this.roleRepo.findAll({ include: { all: true } });
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(id: number) {
    try {
      return `This action returns a #${id} role`;
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      return `This action updates a #${id} role`;
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: number) {
    try {
      return `This action removes a #${id} role`;
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
