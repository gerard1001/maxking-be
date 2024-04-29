import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CourseTagService } from './course_tag.service';
import { CreateCourseTagDto } from './dto/create-course_tag.dto';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { CourseTag } from './model/course_tag.model';

@Controller('course-tag')
export class CourseTagController {
  constructor(private readonly courseTagService: CourseTagService) {}

  @Post()
  async create(
    @Body() createCourseTagDto: CreateCourseTagDto,
  ): Promise<IResponse<CourseTag>> {
    return await this.courseTagService.create(createCourseTagDto);
  }

  @Get()
  async findAll(): Promise<IResponse<CourseTag[]>> {
    return await this.courseTagService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse<CourseTag>> {
    return await this.courseTagService.findById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponse<ICount>> {
    return await this.courseTagService.deleteOne(id);
  }

  @Delete()
  async deleteByCourseAndTagId(
    @Body() deleteCourseTagDto: CreateCourseTagDto,
  ): Promise<IResponse<ICount>> {
    return await this.courseTagService.deleteByCourseAndTagId(
      deleteCourseTagDto,
    );
  }
}
