import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ROLE_MODEL } from 'src/core/constants';
import { Role } from './model/role.model';
import { IResponse } from 'src/core/interfaces/response.interface';
import { UserRepository } from '../user/providers/user.repository';
import { Op } from 'sequelize';

@Injectable()
export class RoleService {
  constructor(
    @Inject(ROLE_MODEL) private readonly roleRepo: typeof Role,
    private readonly userRepo: UserRepository,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  async findAll(req: any): Promise<IResponse<Role[]>> {
    try {
      const excludedRoles = [];

      const loggedInUser = await this.userRepo.findById(req?.user?.id);
      if (!loggedInUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const userRoles = loggedInUser.roles.map((role) => role.type);

      if (userRoles.includes('SUPER_ADMIN')) {
        excludedRoles.push('SUPER_ADMIN');
      } else if (userRoles.includes('ADMIN')) {
        excludedRoles.push('SUPER_ADMIN', 'ADMIN');
      } else if (userRoles.includes('MANAGER')) {
        excludedRoles.push('SUPER_ADMIN', 'ADMIN', 'MANAGER');
      }

      const roles = await this.roleRepo.findAll({
        where: { type: { [Op.notIn]: excludedRoles } },
        include: { all: true },
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Roles fetched successfully',
        data: roles,
      };
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
