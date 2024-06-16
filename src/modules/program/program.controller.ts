import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  UseGuards,
  SetMetadata,
  UsePipes,
} from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/core/upload/multer.config';
import { UserAuthGuard } from 'src/core/guards/auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';
import { ValidationPipe } from 'src/core/pipes/validation.pipe';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Program } from './model/program.model';
import { ProgramService } from './program.service';
import { createProgramValidation } from 'src/core/validations/program.validation';

@Controller('program')
export class ProgramController {
  constructor(private readonly programProgram: ProgramService) {}

  @Post()
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
  @UsePipes(new ValidationPipe(createProgramValidation))
  @UseInterceptors(FileInterceptor('coverImage', multerOptions))
  async create(
    @Body() createProgramDto: CreateProgramDto,
    @UploadedFile() coverImage: Express.Multer.File,
    @Req() req: Request,
  ): Promise<IResponse<Program>> {
    return this.programProgram.create(createProgramDto, coverImage, req);
  }

  @Get()
  async findAll(): Promise<IResponse<Program[]>> {
    return await this.programProgram.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse<Program>> {
    return await this.programProgram.findOne(id);
  }

  @Patch(':id')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: true,
    roles: [ENUM_ROLE_TYPE.SUPER_ADMIN, ENUM_ROLE_TYPE.ADMIN],
  })
  @UseInterceptors(FileInterceptor('coverImage', multerOptions))
  async update(
    @Param('id') id: string,
    @Body() updateProgramDto: UpdateProgramDto,
    @UploadedFile() coverImage: Express.Multer.File,
    @Req() req: Request,
  ): Promise<IResponse<Program>> {
    return await this.programProgram.update(
      id,
      updateProgramDto,
      coverImage,
      req,
    );
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<IResponse<ICount>> {
    return await this.programProgram.deleteOne(id);
  }
}
