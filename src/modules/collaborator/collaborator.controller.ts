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
  UploadedFile,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import { UserAuthGuard } from 'src/core/guards/auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Collaborator } from './model/collaborator.model';
import { multerOptions } from 'src/core/upload/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('collaborator')
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) {}

  @Post()
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: false,
    roles: [
      ENUM_ROLE_TYPE.SUPER_ADMIN,
      ENUM_ROLE_TYPE.ADMIN,
      ENUM_ROLE_TYPE.MANAGER,
    ],
  })
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async create(
    @Body() createCollaboratorDto: CreateCollaboratorDto,
    @UploadedFile() image: Express.Multer.File,
    @Req() req: Request,
  ): Promise<IResponse<Collaborator>> {
    return await this.collaboratorService.create(
      createCollaboratorDto,
      image,
      req,
    );
  }

  @Get()
  findAll(): Promise<IResponse<Collaborator[]>> {
    return this.collaboratorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IResponse<Collaborator>> {
    return this.collaboratorService.findById(id);
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
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async update(
    @Param('id') id: string,
    @Body() updateCollaboratorDto: UpdateCollaboratorDto,
    @UploadedFile() image: Express.Multer.File,
    @Req() req: Request,
  ): Promise<IResponse<Collaborator>> {
    return await this.collaboratorService.update(
      id,
      updateCollaboratorDto,
      image,
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
  remove(@Param('id') id: string): Promise<IResponse<ICount>> {
    return this.collaboratorService.deleteOne(id);
  }
}
