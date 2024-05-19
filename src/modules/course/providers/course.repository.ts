import { Inject, Injectable } from '@nestjs/common';
import { COURSE_MODEL } from 'src/core/constants';
import { Course } from '../model/course.model';
import { Op } from 'sequelize';
import { User } from 'src/modules/user/model/user.model';
import { Profile } from 'src/modules/profile/model/profile.model';
import { Module } from 'src/modules/module/model/module.model';
import { Tag } from 'src/modules/tag/model/tag.model';
import { Chapter } from 'src/modules/chapter/model/chapter.model';
import { Question } from 'src/modules/question/model/question.model';
import { Subject } from 'src/modules/subject/model/subject.model';
import { Category } from 'src/modules/category/model/category.model';

@Injectable()
export class CourseRepository {
  constructor(
    @Inject(COURSE_MODEL) private readonly courseModel: typeof Course,
  ) {}

  async create(createCourseDto: any): Promise<Course> {
    return await this.courseModel.create(createCourseDto);
  }

  async findAll(): Promise<Course[]> {
    return await this.courseModel.findAll({
      include: [
        {
          model: Module,
          as: 'modules',
        },
        {
          model: User,
          as: 'users',
          attributes: ['id', 'firstName', 'lastName', 'email'],
          through: {
            as: 'user_course',
            attributes: [
              'id',
              'userId',
              'courseId',
              'userType',
              'currentModule',
              'rank',
              'completed',
            ],
          },
          include: [
            {
              model: Profile,
              as: 'profile',
              // attributes: ['id', 'firstName', 'lastName'],
            },
          ],
        },
        {
          model: Subject,
          as: 'subject',
          attributes: ['id', 'name'],
          include: [
            {
              model: Category,
              as: 'category',
            },
          ],
        },
      ],
    });
  }

  async findById(id: string): Promise<Course> {
    return await this.courseModel.findByPk(id, {
      include: [
        {
          model: User,
          as: 'users',
          attributes: ['id', 'firstName', 'lastName', 'email'],
          through: { attributes: ['userType', 'currentModule'] },
          include: [
            {
              model: Profile,
              as: 'profile',
              // attributes: ['id', 'firstName', 'lastName'],
            },
          ],
        },
        {
          model: Module,
          as: 'modules',
          include: [
            {
              model: Chapter,
              as: 'chapters',
            },
          ],
        },
        {
          model: Question,
          as: 'questions',
        },
        {
          model: Tag,
          as: 'tags',
          through: { attributes: [] },
        },
        {
          model: Subject,
          as: 'subject',
          attributes: ['id', 'name'],
          include: [
            {
              model: Category,
              as: 'category',
            },
          ],
        },
      ],
    });
  }

  async findByTitle(title: string): Promise<Course> {
    return await this.courseModel.findOne({
      where: { title: { [Op.iLike]: `%${title}` } },
    });
  }

  async findBySubjectId(subjectId: string): Promise<Course[]> {
    return await this.courseModel.findAll({
      where: { subjectId },
      include: [
        {
          model: Module,
          as: 'modules',
        },
        {
          model: User,
          as: 'users',
          attributes: ['id', 'firstName', 'lastName', 'email'],
          through: {
            as: 'user_course',
            attributes: [
              'id',
              'userId',
              'courseId',
              'userType',
              'currentModule',
              'rank',
              'completed',
            ],
          },
          include: [
            {
              model: Profile,
              as: 'profile',
              // attributes: ['id', 'firstName', 'lastName'],
            },
          ],
        },
      ],
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
