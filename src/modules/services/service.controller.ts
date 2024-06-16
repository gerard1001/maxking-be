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
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/core/upload/multer.config';
import { UserAuthGuard } from 'src/core/guards/auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';
import { ValidationPipe } from 'src/core/pipes/validation.pipe';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Service } from './model/service.model';
import { createServiceValidation } from 'src/core/validations/service.validation';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

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
  @UsePipes(new ValidationPipe(createServiceValidation))
  @UseInterceptors(FileInterceptor('coverImage', multerOptions))
  async create(
    @Body() createServiceDto: CreateServiceDto,
    @UploadedFile() coverImage: Express.Multer.File,
    @Req() req: Request,
  ): Promise<IResponse<Service>> {
    return this.serviceService.create(createServiceDto, coverImage, req);
  }

  @Get()
  async findAll(): Promise<IResponse<Service[]>> {
    return await this.serviceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse<Service>> {
    return await this.serviceService.findOne(id);
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
    @Body() updateServiceDto: UpdateServiceDto,
    @UploadedFile() coverImage: Express.Multer.File,
    @Req() req: Request,
  ): Promise<IResponse<Service>> {
    return await this.serviceService.update(
      id,
      updateServiceDto,
      coverImage,
      req,
    );
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<IResponse<ICount>> {
    return await this.serviceService.deleteOne(id);
  }
}
