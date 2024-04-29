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
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UserAuthGuard } from 'src/core/guards/auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';
import { Course } from './model/course.model';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/core/upload/multer.config';

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
  @UseInterceptors(FileInterceptor('coverImage', multerOptions))
  create(
    @Param('id') id: string,
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFile() coverImage: Express.Multer.File,
    @Req() req: Request,
  ): Promise<IResponse<Course>> {
    return this.courseService.create(id, createCourseDto, coverImage, req);
  }

  @Get()
  findAll(): Promise<IResponse<Course[]>> {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IResponse<Course>> {
    return this.courseService.findById(id);
  }

  @Get('subject/:id')
  findBySubjectId(@Param('id') id: string): Promise<IResponse<Course[]>> {
    return this.courseService.findBySubjectId(id);
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
  @UseInterceptors(FileInterceptor('coverImage', multerOptions))
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @UploadedFile() coverImage: Express.Multer.File,
    @Req() req: Request,
  ): Promise<IResponse<Course>> {
    return await this.courseService.update(
      id,
      updateCourseDto,
      coverImage,
      req,
    );
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
