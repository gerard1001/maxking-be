import { Inject, Injectable } from '@nestjs/common';
import { CATEGORY_MODEL } from 'src/core/constants';
import { Category } from '../model/category.model';
import { Op } from 'sequelize';
import { Subject } from 'src/modules/subject/model/subject.model';

@Injectable()
export class CategoryRepository {
  constructor(
    @Inject(CATEGORY_MODEL) private readonly categoryModel: typeof Category,
  ) {}

  async create(createCategoryDto: any): Promise<Category> {
    return await this.categoryModel.create(createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.findAll();
  }

  async findById(id: string): Promise<Category> {
    return await this.categoryModel.findByPk(id, {
      include: [
        {
          model: Subject,
          as: 'subjects',
          attributes: ['id', 'name'],
        },
      ],
    });
  }

  async findByName(name: string): Promise<Category> {
    return await this.categoryModel.findOne({
      where: { name: { [Op.iLike]: `%${name}` } },
    });
  }

  async update(
    id: string,
    updateCategoryDto: any,
  ): Promise<[number, Category[]]> {
    return await this.categoryModel.update(updateCategoryDto, {
      where: { id },
      returning: true,
    });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.categoryModel.destroy({ where: { id } });
  }

  async deleteMultiple(ids: string[]): Promise<number> {
    return await this.categoryModel.destroy({ where: { id: ids } });
  }
}
