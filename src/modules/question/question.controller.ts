import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
  UsePipes,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
// import { UpdateQuestionDto } from './dto/update-question.dto';
import { UserAuthGuard } from 'src/core/guards/auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';
import { Question } from './model/question.model';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { ValidationPipe } from 'src/core/pipes/validation.pipe';
import { createQuestionValidation } from 'src/core/validations/question.validation';

@Controller('question')
export class QuestionController {
  constructor(private readonly subjectService: QuestionService) {}

  @Post(':id')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: false,
    roles: [
      ENUM_ROLE_TYPE.SUPER_ADMIN,
      ENUM_ROLE_TYPE.ADMIN,
      ENUM_ROLE_TYPE.MANAGER,
      ENUM_ROLE_TYPE.MENTOR,
    ],
  })
  @UsePipes(new ValidationPipe(createQuestionValidation))
  async create(
    @Param('id') id: string,
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<IResponse<Question>> {
    return await this.subjectService.create(id, createQuestionDto);
  }

  @Get()
  findAll(): Promise<IResponse<Question[]>> {
    return this.subjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IResponse<Question>> {
    return this.subjectService.findById(id);
  }

  @Get('course/:id')
  async findByModuleOrCourseId(
    @Param('id') id: string,
  ): Promise<IResponse<Question[]>> {
    return await this.subjectService.findByModuleOrCourseId(id);
  }

  // @Patch(':id')
  // @UseGuards(UserAuthGuard, RoleGuard)
  // @SetMetadata('metadata', {
  //   checkAccOwner: false,
  //   roles: [
  //     ENUM_ROLE_TYPE.SUPER_ADMIN,
  //     ENUM_ROLE_TYPE.ADMIN,
  //     ENUM_ROLE_TYPE.MANAGER,
  //   ],
  // })
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateQuestionDto: UpdateQuestionDto,
  // ): Promise<IResponse<Question>> {
  //   return await this.subjectService.update(id, updateQuestionDto);
  // }

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
    return await this.subjectService.deleteOne(id);
  }
}
