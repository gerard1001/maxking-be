import { Inject, Injectable } from '@nestjs/common';
import { USER_COURSE_MODEL } from 'src/core/constants';
import { UserCourse } from '../model/user_course.model';
import { CreateUserCourseDto } from '../dto/create-user_course.dto';

@Injectable()
export class UserCourseRepository {
  constructor(
    @Inject(USER_COURSE_MODEL)
    private readonly userCourseModel: typeof UserCourse,
  ) {}

  async create(createUserCourseDto: any): Promise<UserCourse> {
    return await this.userCourseModel.create(createUserCourseDto);
  }

  async findAll(): Promise<UserCourse[]> {
    return await this.userCourseModel.findAll();
  }

  async findById(id: string): Promise<UserCourse> {
    return await this.userCourseModel.findByPk(id);
  }

  async findByUserAndCourseId(
    userId: string,
    courseId: string,
  ): Promise<UserCourse> {
    return await this.userCourseModel.findOne({
      where: { userId, courseId },
    });
  }

  async findByUserId(userId: string): Promise<UserCourse[]> {
    return await this.userCourseModel.findAll({
      where: { userId },
      include: [
        {
          all: true,
        },
      ],
    });
  }

  async findByCourseId(courseId: string): Promise<UserCourse[]> {
    return await this.userCourseModel.findAll({
      where: { courseId },
    });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.userCourseModel.destroy({ where: { id } });
  }

  async deleteByUserAndCourseId(
    userId: string,
    courseId: string,
  ): Promise<number> {
    return await this.userCourseModel.destroy({
      where: { userId, courseId },
    });
  }
}
