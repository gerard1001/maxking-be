import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserCourseDto } from './dto/create-user_course.dto';
import { UserCourseRepository } from './providers/user_course.repository';
import { CourseRepository } from '../course/providers/course.repository';
import { UserRepository } from '../user/providers/user.repository';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { UserCourse } from './model/user_course.model';
import { MailerHelper } from 'src/core/helpers/mailer.helper';
import { UpdateUserCourseDto } from './dto/update-user_course.dto';
import { UserModuleRepository } from '../user_module/providers/user_module.repository';
import { ModuleRepository } from '../module/providers/module.repository';
import { x } from 'joi';

@Injectable()
export class UserCourseService {
  constructor(
    private readonly userCourseRepo: UserCourseRepository,
    private readonly userRepo: UserRepository,
    private readonly courseRepo: CourseRepository,
    private readonly moduleRepo: ModuleRepository,
    private readonly userModuleRepo: UserModuleRepository,
    private readonly mailerHelper: MailerHelper,
  ) {}

  async create(
    createUserCourseDto: CreateUserCourseDto,
  ): Promise<IResponse<UserCourse>> {
    try {
      const { userId, courseId } = createUserCourseDto;
      const user = await this.userRepo.findById(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const course = await this.courseRepo.findById(courseId);
      if (!course) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }
      const userCourseExists = await this.userCourseRepo.findByUserAndCourseId(
        userId,
        courseId,
      );
      if (userCourseExists) {
        throw new HttpException(
          'User is already enrolled for this course',
          HttpStatus.CONFLICT,
        );
      }
      const email = user.email;
      const subject = 'Course Enrollment';
      const text = `You have successfully enrolled for the course: ${course.title}`;
      try {
        await this.mailerHelper.sendEmail(email, subject, text);
      } catch (error) {
        throw new HttpException(
          'Email delivery has failed, please check again your email address or try again later',
          HttpStatus.BAD_REQUEST,
        );
      }
      const userRole = user.roles[0].type;
      const userCourse = await this.userCourseRepo.create({
        userId,
        courseId,
        userType: userRole === 'CLIENT' ? 'STUDENT' : 'TUTOR',
      });
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User course created successfully',
        data: userCourse,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse<UserCourse[]>> {
    try {
      const userCourses = await this.userCourseRepo.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'User courses retrieved successfully',
        data: userCourses,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<IResponse<UserCourse>> {
    try {
      const userCourse = await this.userCourseRepo.findById(id);
      if (!userCourse) {
        throw new HttpException('User course not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'User course retrieved successfully',
        data: userCourse,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByUserId(userId: string): Promise<IResponse<UserCourse[]>> {
    try {
      const user = await this.userRepo.findById(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const userCourses = await this.userCourseRepo.findByUserId(userId);
      return {
        statusCode: HttpStatus.OK,
        message: 'User courses retrieved successfully',
        data: userCourses,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByCourseId(courseId: string): Promise<IResponse<UserCourse[]>> {
    try {
      const course = await this.courseRepo.findById(courseId);
      if (!course) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }
      const userCourses = await this.userCourseRepo.findByCourseId(courseId);
      return {
        statusCode: HttpStatus.OK,
        message: 'User courses retrieved successfully',
        data: userCourses,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByUserAndCourseId(
    userId: string,
    courseId: string,
  ): Promise<IResponse<UserCourse>> {
    try {
      const user = await this.userRepo.findById(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const course = await this.courseRepo.findById(courseId);
      if (!course) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }
      const userCourse = await this.userCourseRepo.findByUserAndCourseId(
        userId,
        courseId,
      );
      if (!userCourse) {
        throw new HttpException('User course not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'User course retrieved successfully',
        data: userCourse,
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
    updateUserCourseDto: UpdateUserCourseDto,
  ): Promise<IResponse<UserCourse>> {
    try {
      const { currentModule } = updateUserCourseDto;
      const userCourse = await this.userCourseRepo.findById(id);
      if (!userCourse) {
        throw new HttpException('User course not found', HttpStatus.NOT_FOUND);
      }
      const updatedUserCourse = await this.userCourseRepo.update(
        id,
        updateUserCourseDto,
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'Current module updated successfully',
        data: updatedUserCourse[1][0],
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async userPayCourse(
    id: string,
    req: Request,
  ): Promise<IResponse<UserCourse>> {
    try {
      const course = await this.courseRepo.findById(id);
      if (!course) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }

      const userId = req['user'].id;

      const user = await this.userRepo.findById(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const userCourseExists = await this.userCourseRepo.findByUserAndCourseId(
        userId,
        id,
      );
      if (userCourseExists) {
        throw new HttpException(
          'User is already enrolled for this course',
          HttpStatus.CONFLICT,
        );
      }
      const email = user.email;
      const subject = 'Course Enrollment';
      const text = `You have successfully enrolled for the course: ${course.title}`;
      try {
        await this.mailerHelper.sendEmail(email, subject, text);
      } catch (error) {
        throw new HttpException(
          'Email delivery has failed, please check again your email address or try again later',
          HttpStatus.BAD_REQUEST,
        );
      }
      const userCourse = await this.userCourseRepo.create({
        userId,
        courseId: id,
        userType: 'STUDENT',
        isPaid: true,
      });

      console.log(
        userCourse,
        '**************************************************',
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'User course created successfully with payment',
        data: userCourse,
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
      const userCourse = await this.userCourseRepo.findById(id);
      if (!userCourse) {
        throw new HttpException('User course not found', HttpStatus.NOT_FOUND);
      }
      const useCourseModules = await this.moduleRepo.findByUserIdAndCourseId(
        userCourse.userId,
        userCourse.courseId,
      );
      if (useCourseModules.length > 0) {
        console.log(useCourseModules, '^^^^^^^^^');
        for (let i = 0; i < useCourseModules.length; i++) {
          const userModule = await this.userModuleRepo.findByUserAndModuleId(
            userCourse.userId,
            useCourseModules[i].id,
          );
          // const userModule = useCourseModules[i];
          await this.userModuleRepo.deleteOne(userModule.id);
        }
      }
      const count = await this.userCourseRepo.deleteOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'User course deleted successfully',
        data: { count },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteByUserAndCourseId(
    userId: string,
    courseId: string,
  ): Promise<IResponse<ICount>> {
    try {
      const user = await this.userRepo.findById(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const course = await this.courseRepo.findById(courseId);
      if (!course) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }

      const userModules = user.modules.filter((x) => x.courseId === courseId);

      await this.userCourseRepo.deleteByUserAndCourseId(userId, courseId);
      for (let i = 0; i < userModules.length; i++) {
        await this.userModuleRepo.deleteByUserAndModuleId(
          userId,
          userModules[i].id,
        );
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'User course deleted successfully',
        // data: { count },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
