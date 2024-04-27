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

@Controller('user-course')
export class UserCourseController {
  constructor(private readonly articleCourseService: UserCourseService) {}

  @Post()
  async create(
    @Body() createUserCourseDto: CreateUserCourseDto,
  ): Promise<IResponse<UserCourse>> {
    return await this.articleCourseService.create(createUserCourseDto);
  }

  @Get()
  async findAll(): Promise<IResponse<UserCourse[]>> {
    return await this.articleCourseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse<UserCourse>> {
    return await this.articleCourseService.findById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponse<ICount>> {
    return await this.articleCourseService.deleteOne(id);
  }

  @Delete()
  async deleteByUserAndCourseId(
    @Body() deleteUserCourseDto: CreateUserCourseDto,
  ): Promise<IResponse<ICount>> {
    return await this.articleCourseService.deleteByUserAndCourseId(
      deleteUserCourseDto,
    );
  }
}
