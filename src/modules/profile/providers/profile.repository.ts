import { Inject, Injectable } from '@nestjs/common';
import { PROFILE_MODEL } from 'src/core/constants';
import { Profile } from '../model/profile.model';
import { User } from 'src/modules/user/model/user.model';

@Injectable()
export class ProfileRepository {
  constructor(
    @Inject(PROFILE_MODEL) private readonly profileModel: typeof Profile,
  ) {}

  async create(data: any): Promise<Profile> {
    return await this.profileModel.create(data);
  }

  async findAll(): Promise<Profile[]> {
    return await this.profileModel.findAll();
  }

  async findById(id: string): Promise<Profile> {
    return await this.profileModel.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
      ],
    });
  }

  async findByUserId(userId: string): Promise<Profile> {
    return await this.profileModel.findOne({ where: { userId } });
  }

  async update(id: string, data: any): Promise<[number, Profile[]]> {
    return await this.profileModel.update(data, {
      where: { id },
      returning: true,
    });
  }
}
