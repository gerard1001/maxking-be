import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UserAuthGuard } from 'src/core/guards/auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';
import { Course } from './model/course.model';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post(':id')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: false,
    roles: [
      ENUM_ROLE_TYPE.SUPER_ADMIN,
      ENUM_ROLE_TYPE.ADMIN,
      ENUM_ROLE_TYPE.MANAGER,
    ],
  })
  create(
    @Param('id') id: string,
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<IResponse<Course>> {
    return this.courseService.create(id, createCourseDto);
  }

  @Get()
  findAll(): Promise<IResponse<Course[]>> {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IResponse<Course>> {
    return this.courseService.findById(id);
  }

  @Patch(':id')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: false,
    roles: [
      ENUM_ROLE_TYPE.SUPER_ADMIN,
      ENUM_ROLE_TYPE.ADMIN,
      ENUM_ROLE_TYPE.MANAGER,
    ],
  })
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<IResponse<Course>> {
    return await this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: false,
    roles: [
      ENUM_ROLE_TYPE.SUPER_ADMIN,
      ENUM_ROLE_TYPE.ADMIN,
      ENUM_ROLE_TYPE.MANAGER,
    ],
  })
  async deleteOne(@Param('id') id: string): Promise<IResponse<ICount>> {
    return await this.courseService.deleteOne(id);
  }
}
