import { Inject, Injectable } from '@nestjs/common';
import { USER_MODULE_MODEL } from 'src/core/constants';
import { UserModule } from '../model/user_module.model';
import { CreateUserModuleDto } from '../dto/create-user_module.dto';

@Injectable()
export class UserModuleRepository {
  constructor(
    @Inject(USER_MODULE_MODEL)
    private readonly userModuleModel: typeof UserModule,
  ) {}

  async create(createUserModuleDto: CreateUserModuleDto): Promise<UserModule> {
    return await this.userModuleModel.create(createUserModuleDto);
  }

  async findAll(): Promise<UserModule[]> {
    return await this.userModuleModel.findAll();
  }

  async findById(id: string): Promise<UserModule> {
    return await this.userModuleModel.findByPk(id);
  }

  async findByUserAndModuleId(
    userId: string,
    moduleId: string,
  ): Promise<UserModule> {
    return await this.userModuleModel.findOne({
      where: { userId, moduleId },
    });
  }

  async findByUserId(userId: string): Promise<UserModule[]> {
    return await this.userModuleModel.findAll({
      where: { userId },
      include: [
        {
          all: true,
        },
      ],
    });
  }

  async findByModuleId(moduleId: string): Promise<UserModule[]> {
    return await this.userModuleModel.findAll({
      where: { moduleId },
    });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.userModuleModel.destroy({ where: { id } });
  }

  async deleteByUserAndModuleId(
    userId: string,
    moduleId: string,
  ): Promise<number> {
    return await this.userModuleModel.destroy({
      where: { userId, moduleId },
    });
  }
}
