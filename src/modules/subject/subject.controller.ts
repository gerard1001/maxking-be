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
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { UserAuthGuard } from 'src/core/guards/auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';
import { Subject } from './model/subject.model';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

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
  async create(
    @Param('id') id: string,
    @Body() createSubjectDto: CreateSubjectDto,
  ): Promise<IResponse<Subject>> {
    return await this.subjectService.create(id, createSubjectDto);
  }

  @Get()
  findAll(): Promise<IResponse<Subject[]>> {
    return this.subjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IResponse<Subject>> {
    return this.subjectService.findById(id);
  }

  @Get('category/:id')
  findByCategoryId(
    @Param('id') categoryId: string,
  ): Promise<IResponse<Subject[]>> {
    return this.subjectService.findByCategoryId(categoryId);
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
    @Body() updateSubjectDto: UpdateSubjectDto,
  ): Promise<IResponse<Subject>> {
    return await this.subjectService.update(id, updateSubjectDto);
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
    return await this.subjectService.deleteOne(id);
  }
}
