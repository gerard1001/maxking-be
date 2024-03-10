import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../model/user.model';
import { Role } from '../../role/model/role.model';
import { USER_MODEL } from 'src/core/constants';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(@Inject(USER_MODEL) private readonly userModel: typeof User) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll({
      include: [
        {
          model: Role,
          as: 'roles',
          attributes: ['id', 'type'],
          through: { attributes: [] },
        },
      ],
    });
  }

  findById(id: string) {
    return this.userModel.findByPk(id, {
      include: [
        {
          model: Role,
          as: 'roles',
          attributes: ['id', 'type'],
          through: { attributes: [] },
        },
      ],
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async deleteOne(id: string): Promise<number> {
    return await this.userModel.destroy({ where: { id } });
  }

  async deleteMultiple(ids: string[]): Promise<number> {
    return await this.userModel.destroy({ where: { id: ids } });
  }
}
