import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseRepository } from './providers/course.repository';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Course } from './model/course.model';
import { SubjectRepository } from '../subject/providers/subject.repository';

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepo: CourseRepository,
    private readonly subjectRepo: SubjectRepository,
  ) {}

  async create(
    id: string,
    createCourseDto: CreateCourseDto,
  ): Promise<IResponse<Course>> {
    try {
      const { title, previewVideo, previewText } = createCourseDto;
      const subjectExists = await this.subjectRepo.findById(id);
      if (!subjectExists) {
        throw new HttpException(`Subject not found`, HttpStatus.NOT_FOUND);
      }
      const courseExists = await this.courseRepo.findByTitle(title.trim());
      if (courseExists) {
        throw new HttpException(
          `Course: "${title}" already exists`,
          HttpStatus.CONFLICT,
        );
      }
      if ((!previewText && !previewVideo) || (previewText && previewVideo)) {
        throw new HttpException(
          'Either previewText or previewVideo should be provided',
          HttpStatus.BAD_REQUEST,
        );
      }

      const course = await this.courseRepo.create({
        title: title.trim(),
        previewVideo: previewVideo.trim(),
        previewText: previewText.trim(),
        subjectId: id,
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: `Course created successfully`,
        data: course,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse<Course[]>> {
    try {
      const courses = await this.courseRepo.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Courses retrieved successfully',
        data: courses,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<IResponse<Course>> {
    try {
      const course = await this.courseRepo.findById(id);
      if (!course) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Course retrieved successfully',
        data: course,
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
    updateCourseDto: UpdateCourseDto,
  ): Promise<IResponse<Course>> {
    try {
      const { title } = updateCourseDto;
      const nameCourse = await this.courseRepo.findByTitle(title);
      const idCourse = await this.courseRepo.findById(id);
      if (!idCourse) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }
      if (nameCourse && nameCourse.id !== idCourse.id) {
        throw new HttpException(
          `Course: ${name} already exists`,
          HttpStatus.CONFLICT,
        );
      }
      const newCourse = await this.courseRepo.update(id, updateCourseDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Course updated successfully',
        data: newCourse[1][0],
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
      const course = await this.courseRepo.findById(id);
      if (!course) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }
      const count = await this.courseRepo.deleteOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Course deleted successfully',
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
