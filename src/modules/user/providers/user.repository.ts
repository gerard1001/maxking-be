import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../model/user.model';
import { Role } from '../../role/model/role.model';
import { USER_MODEL } from 'src/core/constants';
import { Profile } from 'src/modules/profile/model/profile.model';
import { Op } from 'sequelize';
import { Course } from 'src/modules/course/model/course.model';
import { Module } from 'src/modules/module/model/module.model';

@Injectable()
export class UserRepository {
  constructor(@Inject(USER_MODEL) private readonly userModel: typeof User) {}

  async register(createUserDto: any): Promise<User> {
    return await this.userModel.create(createUserDto);
  }

  async findAll(excludedRoles: string[]): Promise<User[]> {
    return await this.userModel.findAll({
      include: [
        {
          model: Role,
          as: 'roles',
          attributes: ['id', 'type'],
          where: {
            type: {
              [Op.notIn]: excludedRoles,
            },
          },
          // through: { attributes: [] },
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
        {
          model: Course,
          as: 'courses',
          through: {
            as: 'user_course',
            attributes: ['id', 'userId', 'courseId', 'currentModule', 'rank'],
          },
        },
        {
          model: Module,
          as: 'modules',
          through: {
            as: 'user_module',
            attributes: ['id', 'userId', 'moduleId', 'currentChapter', 'rank'],
          },
        },
      ],
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({
      where: { email },
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
