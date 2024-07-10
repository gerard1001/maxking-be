import { Inject, Injectable } from '@nestjs/common';
import { COURSE_TAG_MODEL } from 'src/core/constants';
import { CourseTag } from '../model/course_tag.model';
import { CreateCourseTagDto } from '../dto/create-course_tag.dto';

@Injectable()
export class CourseTagRepository {
  constructor(
    @Inject(COURSE_TAG_MODEL)
    private readonly courseTagModel: typeof CourseTag,
  ) {}

  async create(createCourseTagDto: CreateCourseTagDto): Promise<CourseTag> {
    return await this.courseTagModel.create(createCourseTagDto);
  }

  async findAll(): Promise<CourseTag[]> {
    return await this.courseTagModel.findAll({
      attributes: ['id', 'courseId', 'tagId', 'createdAt', 'updatedAt'],
    });
  }

  async findById(id: string): Promise<CourseTag> {
    return await this.courseTagModel.findByPk(id);
  }

  async findByCourseAndTagId(
    courseId: string,
    tagId: string,
  ): Promise<CourseTag> {
    return await this.courseTagModel.findOne({
      where: { courseId, tagId },
    });
  }

  async findByCourseId(courseId: string): Promise<CourseTag[]> {
    return await this.courseTagModel.findAll({
      where: { courseId },
      include: [
        {
          all: true,
        },
      ],
    });
  }

  async findByTagId(tagId: string): Promise<CourseTag[]> {
    return await this.courseTagModel.findAll({
      where: { tagId },
    });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.courseTagModel.destroy({ where: { id } });
  }

  async deleteByCourseAndTagId(
    courseId: string,
    tagId: string,
  ): Promise<number> {
    return await this.courseTagModel.destroy({
      where: { courseId, tagId },
    });
  }
}
