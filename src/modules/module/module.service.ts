import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { ModuleRepository } from './providers/module.repository';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Module } from './model/module.model';
import { CourseRepository } from '../course/providers/course.repository';

@Injectable()
export class ModuleService {
  constructor(
    private readonly moduleRepo: ModuleRepository,
    private readonly courseRepo: CourseRepository,
  ) {}

  async create(
    id: string,
    createModuleDto: CreateModuleDto,
  ): Promise<IResponse<Module>> {
    try {
      const { title, description } = createModuleDto;
      const moduleNumber = (await this.moduleRepo.countByCourseId(id)) + 1;
      const courseExists = await this.courseRepo.findById(id);
      if (!courseExists) {
        throw new HttpException(`Course not found`, HttpStatus.NOT_FOUND);
      }
      const moduleExists = await this.moduleRepo.findByTitle(title.trim());
      if (moduleExists) {
        throw new HttpException(
          `Module: ${title} already exists`,
          HttpStatus.CONFLICT,
        );
      }
      const moduleNumberExists =
        await this.moduleRepo.findByCourseIdAndModuleNumber(id, moduleNumber);
      if (moduleNumberExists) {
        throw new HttpException(
          `Module number: ${moduleNumber} already exists for this course`,
          HttpStatus.CONFLICT,
        );
      }

      const module = await this.moduleRepo.create({
        moduleNumber,
        title: title && title.trim(),
        description: description && description.trim(),
        courseId: id,
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: `Module created successfully`,
        data: module,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse<Module[]>> {
    try {
      const modules = await this.moduleRepo.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Modules retrieved successfully',
        data: modules,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<IResponse<Module>> {
    try {
      const module = await this.moduleRepo.findById(id);
      if (!module) {
        throw new HttpException('Module not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Module retrieved successfully',
        data: module,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByCourseId(courseId: string): Promise<IResponse<Module[]>> {
    try {
      const courseExists = await this.courseRepo.findById(courseId);
      if (!courseExists) {
        throw new HttpException(`Course not found`, HttpStatus.NOT_FOUND);
      }
      const modules = await this.moduleRepo.findByCourseId(courseId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Modules retrieved successfully',
        data: modules,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    updateModuleDto: UpdateModuleDto,
  ): Promise<IResponse<Module>> {
    try {
      const { title } = updateModuleDto;
      const nameModule = await this.moduleRepo.findByTitle(title);
      const idModule = await this.moduleRepo.findById(id);
      if (!idModule) {
        throw new HttpException('Module not found', HttpStatus.NOT_FOUND);
      }
      if (nameModule && nameModule.id !== idModule.id) {
        throw new HttpException(
          `Module: ${title} already exists`,
          HttpStatus.CONFLICT,
        );
      }
      const newModule = await this.moduleRepo.update(id, updateModuleDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Module updated successfully',
        data: newModule[1][0],
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
      const module = await this.moduleRepo.findById(id);
      if (!module) {
        throw new HttpException('Module not found', HttpStatus.NOT_FOUND);
      }
      const count = await this.moduleRepo.deleteOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Module deleted successfully',
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
