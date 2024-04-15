import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../model/user.model';
import { Role } from '../../role/model/role.model';
import { USER_MODEL } from 'src/core/constants';
import { Profile } from 'src/modules/profile/model/profile.model';

@Injectable()
export class UserRepository {
  constructor(@Inject(USER_MODEL) private readonly userModel: typeof User) {}

  async register(createUserDto: any): Promise<User> {
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
        { model: Profile, as: 'profile' },
      ],
    });
  }

  async findById(id: string) {
    return await this.userModel.findByPk(id, {
      include: [
        {
          model: Role,
          as: 'roles',
          attributes: ['id', 'type'],
          through: { attributes: [] },
        },
        { model: Profile, as: 'profile' },
      ],
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ where: { email } });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<[number, User[]]> {
    return await this.userModel.update(updateUserDto, {
      where: { id },
      returning: true,
    });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.userModel.destroy({ where: { id } });
  }

  async deleteByEmail(email: string): Promise<number> {
    return await this.userModel.destroy({ where: { email } });
  }

  async deleteMultiple(ids: string[]): Promise<number> {
    return await this.userModel.destroy({ where: { id: ids } });
  }
}
