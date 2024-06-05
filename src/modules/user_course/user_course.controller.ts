import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { UserCourseService } from './user_course.service';
import { CreateUserCourseDto } from './dto/create-user_course.dto';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { UserCourse } from './model/user_course.model';
import { UpdateUserCourseDto } from './dto/update-user_course.dto';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';
import { RoleGuard } from 'src/core/guards/role.guard';
import { UserAuthGuard } from 'src/core/guards/auth.guard';

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

  @Get('pay-course/:id')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: false,
    roles: [
      ENUM_ROLE_TYPE.SUPER_ADMIN,
      ENUM_ROLE_TYPE.ADMIN,
      ENUM_ROLE_TYPE.MANAGER,
      ENUM_ROLE_TYPE.MENTOR,
      ENUM_ROLE_TYPE.CLIENT,
    ],
  })
  async userPayCourse(@Param('id') id: string, @Req() req: Request) {
    return await this.userCourseService.userPayCourse(id, req);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserCourseDto: UpdateUserCourseDto,
  ): Promise<IResponse<UserCourse>> {
    return await this.userCourseService.update(id, updateUserCourseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponse<ICount>> {
    return await this.userCourseService.deleteOne(id);
  }

  @Delete(':userId/:courseId')
  async deleteByUserAndCourseId(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ): Promise<IResponse<ICount>> {
    return await this.userCourseService.deleteByUserAndCourseId(
      userId,
      courseId,
    );
  }
}
