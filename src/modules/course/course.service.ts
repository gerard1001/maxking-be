import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseRepository } from './providers/course.repository';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Course } from './model/course.model';
import { SubjectRepository } from '../subject/providers/subject.repository';
import { UserCourseRepository } from '../user_course/providers/user_course.repository';
import { UserRepository } from '../user/providers/user.repository';
import { CloudinaryService } from 'src/core/upload/cloudinary/cloudinary.service';

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepo: CourseRepository,
    private readonly userRepo: UserRepository,
    private readonly subjectRepo: SubjectRepository,
    private readonly userCourseRepo: UserCourseRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    id: string,
    createCourseDto: CreateCourseDto,
    coverImage: Express.Multer.File,
    req: Request,
  ): Promise<IResponse<Course>> {
    try {
      const { title, previewVideo, previewText, tutor } = createCourseDto;
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
      const user = await this.userRepo.findById(tutor);
      if (!user) {
        throw new HttpException('Tutor not found', HttpStatus.NOT_FOUND);
      }
      const file =
        req['file'] &&
        (await this.cloudinaryService.uploadImage(coverImage).catch((err) => {
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }));
      const course = await this.courseRepo.create({
        title: title.trim(),
        previewVideo: previewVideo.trim(),
        previewText: previewText.trim(),
        coverImage: req['file'] && file?.secure_url,
        subjectId: id,
      });

      try {
        await this.userCourseRepo.create({
          userId: tutor,
          courseId: course.id,
          userType: 'TUTOR',
        });
      } catch (error) {
        await this.courseRepo.deleteOne(course.id);
        throw new HttpException(
          error.message || 'Failed to assign course to tutor',
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

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
    coverImage: Express.Multer.File,
    req: Request,
  ): Promise<IResponse<Course>> {
    try {
      const { title } = updateCourseDto;
      const nameCourse = await this.courseRepo.findByTitle(title);
      const course = await this.courseRepo.findById(id);
      if (!course) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }
      if (nameCourse && nameCourse.id !== course.id) {
        throw new HttpException(
          `Course: ${name} already exists`,
          HttpStatus.CONFLICT,
        );
      }
      const file =
        req['file'] &&
        (await this.cloudinaryService.uploadImage(coverImage).catch((err) => {
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }));
      const newCourse = await this.courseRepo.update(id, {
        ...updateCourseDto,
        coverImage: req['file'] ? file?.secure_url : course.coverImage,
      });
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
