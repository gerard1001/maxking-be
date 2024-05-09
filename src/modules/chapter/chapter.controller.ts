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
  UsePipes,
} from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { UserAuthGuard } from 'src/core/guards/auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';
import { Chapter } from './model/chapter.model';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { ValidationPipe } from 'src/core/pipes/validation.pipe';
import { createChapterValidation } from 'src/core/validations/chapter.validation';

@Controller('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

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
  @UsePipes(new ValidationPipe(createChapterValidation))
  async create(
    @Param('id') id: string,
    @Body() createChapterDto: CreateChapterDto,
  ): Promise<IResponse<Chapter>> {
    return await this.chapterService.create(id, createChapterDto);
  }

  @Get()
  findAll(): Promise<IResponse<Chapter[]>> {
    return this.chapterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IResponse<Chapter>> {
    return this.chapterService.findById(id);
  }

  @Get(':id/module/:moduleId')
  findByModuleId(
    @Param('modulId') modulId: string,
    @Param('id') id: string,
  ): Promise<IResponse<Chapter>> {
    return this.chapterService.findByModuleIdAndChapterNumber(modulId, id);
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
    @Body() updateChapterDto: UpdateChapterDto,
  ): Promise<IResponse<Chapter>> {
    return await this.chapterService.update(id, updateChapterDto);
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
    return await this.chapterService.deleteOne(id);
  }
}
