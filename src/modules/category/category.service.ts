import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './providers/category.repository';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Category } from './model/category.model';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<IResponse<Category>> {
    try {
      const { name } = createCategoryDto;
      const categoryExists = await this.categoryRepo.findByName(name.trim());
      if (categoryExists) {
        throw new HttpException(
          `Category: ${name} already exists`,
          HttpStatus.CONFLICT,
        );
      }

      const category = await this.categoryRepo.create({ name: name.trim() });
      return {
        statusCode: HttpStatus.CREATED,
        message: `Category created successfully`,
        data: category,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse<Category[]>> {
    try {
      const categories = await this.categoryRepo.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Categories retrieved successfully',
        data: categories,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<IResponse<Category>> {
    try {
      const category = await this.categoryRepo.findById(id);
      if (!category) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Category retrieved successfully',
        data: category,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByName(name: string): Promise<IResponse<Category>> {
    try {
      const category = await this.categoryRepo.findByName(name);
      if (!category) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Category retrieved successfully',
        data: category,
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
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<IResponse<Category>> {
    try {
      const { name } = updateCategoryDto;
      const nameCategory = await this.categoryRepo.findByName(name);
      const idCategory = await this.categoryRepo.findById(id);
      if (!idCategory) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
      if (nameCategory && nameCategory.id !== idCategory.id) {
        throw new HttpException(
          `Category: ${name} already exists`,
          HttpStatus.CONFLICT,
        );
      }
      const newCategory = await this.categoryRepo.update(id, updateCategoryDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Category updated successfully',
        data: newCategory[1][0],
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
      const category = await this.categoryRepo.findById(id);
      if (!category) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
      const count = await this.categoryRepo.deleteOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Category deleted successfully',
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
