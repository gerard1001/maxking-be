import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseTagDto } from './dto/create-course_tag.dto';
import { CourseTagRepository } from './providers/course_tag.repository';
import { TagRepository } from '../tag/providers/tag.repository';
import { CourseRepository } from '../course/providers/course.repository';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { CourseTag } from './model/course_tag.model';

@Injectable()
export class CourseTagService {
  constructor(
    private readonly courseTagRepo: CourseTagRepository,
    private readonly courseRepo: CourseRepository,
    private readonly tagRepo: TagRepository,
  ) {}

  async create(
    createCourseTagDto: CreateCourseTagDto,
  ): Promise<IResponse<CourseTag>> {
    try {
      const { courseId, tagId } = createCourseTagDto;
      const course = await this.courseRepo.findById(courseId);
      if (!course) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }
      const tag = await this.tagRepo.findById(tagId);
      if (!tag) {
        throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
      }
      const courseTag = await this.courseTagRepo.create({
        courseId,
        tagId,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Course tag created successfully',
        data: courseTag,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse<CourseTag[]>> {
    try {
      const courseTags = await this.courseTagRepo.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Course tags retrieved successfully',
        data: courseTags,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<IResponse<CourseTag>> {
    try {
      const courseTag = await this.courseTagRepo.findById(id);
      if (!courseTag) {
        throw new HttpException('Course tag not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Course tag retrieved successfully',
        data: courseTag,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByCourseId(courseId: string): Promise<IResponse<CourseTag[]>> {
    try {
      const course = await this.courseRepo.findById(courseId);
      if (!course) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }
      const courseTags = await this.courseTagRepo.findByCourseId(courseId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Course tags retrieved successfully',
        data: courseTags,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByTagId(tagId: string): Promise<IResponse<CourseTag[]>> {
    try {
      const tag = await this.tagRepo.findById(tagId);
      if (!tag) {
        throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
      }
      const courseTags = await this.courseTagRepo.findByTagId(tagId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Course tags retrieved successfully',
        data: courseTags,
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
      const courseTag = await this.courseTagRepo.findById(id);
      if (!courseTag) {
        throw new HttpException('Course tag not found', HttpStatus.NOT_FOUND);
      }
      const count = await this.courseTagRepo.deleteOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Course tag deleted successfully',
        data: { count },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteByCourseAndTagId(
    deleteCourseTagDto: CreateCourseTagDto,
  ): Promise<IResponse<ICount>> {
    try {
      const { courseId, tagId } = deleteCourseTagDto;
      const course = await this.courseRepo.findById(courseId);
      if (!course) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }
      const tag = await this.tagRepo.findById(tagId);
      if (!tag) {
        throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
      }
      const count = await this.courseTagRepo.deleteByCourseAndTagId(
        courseId,
        tagId,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Course tag deleted successfully',
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
