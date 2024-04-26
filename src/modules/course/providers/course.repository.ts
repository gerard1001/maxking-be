import { Inject, Injectable } from '@nestjs/common';
import { COURSE_MODEL } from 'src/core/constants';
import { Course } from '../model/course.model';
import { Op } from 'sequelize';

@Injectable()
export class CourseRepository {
  constructor(
    @Inject(COURSE_MODEL) private readonly courseModel: typeof Course,
  ) {}

  async create(createCourseDto: any): Promise<Course> {
    return await this.courseModel.create(createCourseDto);
  }

  async findAll(): Promise<Course[]> {
    return await this.courseModel.findAll();
  }

  async findById(id: string): Promise<Course> {
    return await this.courseModel.findByPk(id);
  }

  async findByTitle(title: string): Promise<Course> {
    return await this.courseModel.findOne({
      where: { title: { [Op.iLike]: `%${title}` } },
    });
  }

  async update(id: string, updateCourseDto: any): Promise<[number, Course[]]> {
    return await this.courseModel.update(updateCourseDto, {
      where: { id },
      returning: true,
    });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.courseModel.destroy({ where: { id } });
  }

  async deleteMultiple(ids: string[]): Promise<number> {
    return await this.courseModel.destroy({ where: { id: ids } });
  }
}
