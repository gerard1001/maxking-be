import { Inject, Injectable } from '@nestjs/common';
import { SUBJECT_MODEL } from 'src/core/constants';
import { Subject } from '../model/subject.model';
import { Op } from 'sequelize';
import { Course } from 'src/modules/course/model/course.model';

@Injectable()
export class SubjectRepository {
  constructor(
    @Inject(SUBJECT_MODEL) private readonly subjectModel: typeof Subject,
  ) {}

  async create(createSubjectDto: any): Promise<Subject> {
    return await this.subjectModel.create(createSubjectDto);
  }

  async findAll(): Promise<Subject[]> {
    return await this.subjectModel.findAll({
      include: [
        {
          model: Course,
          as: 'courses',
          // attributes: [],
        },
      ],
    });
  }

  async findById(id: string): Promise<Subject> {
    return await this.subjectModel.findByPk(id);
  }

  async findByName(name: string): Promise<Subject> {
    return await this.subjectModel.findOne({
      where: { name: { [Op.iLike]: `%${name}` } },
    });
  }

  async findByCategoryId(categoryId: string): Promise<Subject[]> {
    return await this.subjectModel.findAll({
      where: { categoryId },
      include: [
        {
          model: Course,
          as: 'courses',
          // attributes: [],
        },
      ],
    });
  }

  async update(
    id: string,
    updateSubjectDto: any,
  ): Promise<[number, Subject[]]> {
    return await this.subjectModel.update(updateSubjectDto, {
      where: { id },
      returning: true,
    });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.subjectModel.destroy({ where: { id } });
  }

  async deleteMultiple(ids: string[]): Promise<number> {
    return await this.subjectModel.destroy({ where: { id: ids } });
  }
}
