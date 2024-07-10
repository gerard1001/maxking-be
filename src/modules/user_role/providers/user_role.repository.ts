import { Inject, Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from '../dto/create-user_role.dto';
import { UpdateUserRoleDto } from '../dto/update-user_role.dto';
import { USER_ROLE_MODEL } from 'src/core/constants';
import { UserRole } from '../models/user_role.model';

@Injectable()
export class UserRoleRepository {
  constructor(
    @Inject(USER_ROLE_MODEL)
    private readonly userRoleModel: typeof UserRole,
  ) {}

  async create(createUserRoleDto: CreateUserRoleDto): Promise<UserRole> {
    return await this.userRoleModel.create(createUserRoleDto);
  }

  async findAll(): Promise<UserRole[]> {
    return await this.userRoleModel.findAll({
      attributes: ['id', 'roleId', 'userId', 'createdAt', 'updatedAt'],
    });
  }

  async findById(id: number) {
    return await this.userRoleModel.findByPk(id);
  }

  async findByUserAndRole(roleId: string, userId: string) {
    return await this.userRoleModel.findOne({ where: { userId, roleId } });
  }

  update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    return `This action updates a #${id} userRole`;
  }

  async deleteOne(id: string): Promise<any> {
    return await this.userRoleModel.destroy({ where: { id } });
  }
}
