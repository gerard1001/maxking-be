import { Inject, Injectable } from '@nestjs/common';
import { MODULE_MODEL } from 'src/core/constants';
import { Module } from '../model/module.model';
import { Op } from 'sequelize';

@Injectable()
export class ModuleRepository {
  constructor(
    @Inject(MODULE_MODEL) private readonly moduleModel: typeof Module,
  ) {}

  async create(createModuleDto: any): Promise<Module> {
    return await this.moduleModel.create(createModuleDto);
  }

  async findAll(): Promise<Module[]> {
    return await this.moduleModel.findAll();
  }

  async findById(id: string): Promise<Module> {
    return await this.moduleModel.findByPk(id);
  }

  async findByTitle(title: string): Promise<Module> {
    return await this.moduleModel.findOne({
      where: { title: { [Op.iLike]: `%${title}` } },
    });
  }

  async findByCourseIdAndModuleNumber(
    courseId: string,
    moduleNumber: number,
  ): Promise<Module> {
    return await this.moduleModel.findOne({
      where: { courseId, moduleNumber },
    });
  }

  async update(id: string, updateModuleDto: any): Promise<[number, Module[]]> {
    return await this.moduleModel.update(updateModuleDto, {
      where: { id },
      returning: true,
    });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.moduleModel.destroy({ where: { id } });
  }

  async deleteMultiple(ids: string[]): Promise<number> {
    return await this.moduleModel.destroy({ where: { id: ids } });
  }
}