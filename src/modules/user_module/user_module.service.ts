import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserModuleDto } from './dto/create-user_module.dto';
import { UserModuleRepository } from './providers/user_module.repository';
import { ModuleRepository } from '../module/providers/module.repository';
import { UserRepository } from '../user/providers/user.repository';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { UserModule } from './model/user_module.model';

@Injectable()
export class UserModuleService {
  constructor(
    private readonly userModuleRepo: UserModuleRepository,
    private readonly userRepo: UserRepository,
    private readonly moduleRepo: ModuleRepository,
  ) {}

  async create(
    createUserModuleDto: CreateUserModuleDto,
  ): Promise<IResponse<UserModule>> {
    try {
      const { userId, moduleId } = createUserModuleDto;
      const user = await this.userRepo.findById(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const module = await this.moduleRepo.findById(moduleId);
      if (!module) {
        throw new HttpException('Module not found', HttpStatus.NOT_FOUND);
      }
      const userModule = await this.userModuleRepo.create({
        userId,
        moduleId,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'User module created successfully',
        data: userModule,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse<UserModule[]>> {
    try {
      const userModules = await this.userModuleRepo.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'User modules retrieved successfully',
        data: userModules,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<IResponse<UserModule>> {
    try {
      const userModule = await this.userModuleRepo.findById(id);
      if (!userModule) {
        throw new HttpException('User module not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'User module retrieved successfully',
        data: userModule,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByUserId(userId: string): Promise<IResponse<UserModule[]>> {
    try {
      const user = await this.userRepo.findById(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const userModules = await this.userModuleRepo.findByUserId(userId);
      return {
        statusCode: HttpStatus.OK,
        message: 'User modules retrieved successfully',
        data: userModules,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByModuleId(moduleId: string): Promise<IResponse<UserModule[]>> {
    try {
      const module = await this.moduleRepo.findById(moduleId);
      if (!module) {
        throw new HttpException('Module not found', HttpStatus.NOT_FOUND);
      }
      const userModules = await this.userModuleRepo.findByModuleId(moduleId);
      return {
        statusCode: HttpStatus.OK,
        message: 'User modules retrieved successfully',
        data: userModules,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteOne(id: string): Promise<IResponse<ICount>> {
    try {
      const userModule = await this.userModuleRepo.findById(id);
      if (!userModule) {
        throw new HttpException('User module not found', HttpStatus.NOT_FOUND);
      }
      const count = await this.userModuleRepo.deleteOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'User module deleted successfully',
        data: { count },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteByUserAndModuleId(
    deleteUserModuleDto: CreateUserModuleDto,
  ): Promise<IResponse<ICount>> {
    try {
      const { userId, moduleId } = deleteUserModuleDto;
      const user = await this.userRepo.findById(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const module = await this.moduleRepo.findById(moduleId);
      if (!module) {
        throw new HttpException('Module not found', HttpStatus.NOT_FOUND);
      }
      const count = await this.userModuleRepo.deleteByUserAndModuleId(
        userId,
        moduleId,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'User module deleted successfully',
        data: { count },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
