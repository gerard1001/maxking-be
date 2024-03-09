import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { ROLE_MODEL } from 'src/core/constants';
import { Role } from '../model/role.model';

@Injectable()
export class RoleRepository {
  constructor(@Inject(ROLE_MODEL) private readonly roleModel: typeof Role) {}

  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  async findAll(): Promise<Role[]> {
    return await this.roleModel.findAll();
  }

  async findById(id: string): Promise<Role> {
    return await this.roleModel.findByPk(id);
  }

  async findByType(type: string): Promise<Role> {
    return await this.roleModel.findOne({ where: { type } });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
