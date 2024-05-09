import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserCourseService } from './user_course.service';
import { CreateUserCourseDto } from './dto/create-user_course.dto';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { UserCourse } from './model/user_course.model';
import { UpdateUserCourseDto } from './dto/update-user_course.dto';

@Controller('user-course')
export class UserCourseController {
  constructor(private readonly userCourseService: UserCourseService) {}

  @Post()
  async create(
    @Body() createUserCourseDto: CreateUserCourseDto,
  ): Promise<IResponse<UserCourse>> {
    return await this.userCourseService.create(createUserCourseDto);
  }

  @Get()
  async findAll(): Promise<IResponse<UserCourse[]>> {
    return await this.userCourseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse<UserCourse>> {
    return await this.userCourseService.findById(id);
  }

  @Get('user/:userId/course/:courseId')
  async findByUserAndCourseId(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ): Promise<IResponse<UserCourse>> {
    return await this.userCourseService.findByUserAndCourseId(userId, courseId);
  }

  @Patch(':id')
  async updateCurrentModule(
    @Param('id') id: string,
    @Body() updateUserCourseDto: UpdateUserCourseDto,
  ): Promise<IResponse<UserCourse>> {
    return await this.userCourseService.updateCurrentModule(
      id,
      updateUserCourseDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponse<ICount>> {
    return await this.userCourseService.deleteOne(id);
  }

  @Delete()
  async deleteByUserAndCourseId(
    @Body() deleteUserCourseDto: CreateUserCourseDto,
  ): Promise<IResponse<ICount>> {
    return await this.userCourseService.deleteByUserAndCourseId(
      deleteUserCourseDto,
    );
  }
}
