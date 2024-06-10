import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
  Req,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UserAuthGuard } from 'src/core/guards/auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Certificate } from './model/certificate.model';
import { CertificateService } from './certificate.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/core/upload/multer.config';

@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Post(':id')
  // @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: false,
    roles: [
      ENUM_ROLE_TYPE.SUPER_ADMIN,
      ENUM_ROLE_TYPE.ADMIN,
      ENUM_ROLE_TYPE.MANAGER,
    ],
  })
  @UseInterceptors(AnyFilesInterceptor(multerOptions))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('id') id: string,
    @Body() createCertificateDto: CreateCertificateDto,
    @Req() req: Request,
  ): Promise<IResponse<Certificate>> {
    return await this.certificateService.create(
      id,
      createCertificateDto,
      files,
      req,
    );
  }

  @Get()
  findAll(): Promise<IResponse<Certificate[]>> {
    return this.certificateService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse<Certificate>> {
    return await this.certificateService.findById(id);
  }

  @Delete(':id')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: true,
    roles: [
      ENUM_ROLE_TYPE.SUPER_ADMIN,
      ENUM_ROLE_TYPE.ADMIN,
      ENUM_ROLE_TYPE.MANAGER,
      ENUM_ROLE_TYPE.CLIENT,
    ],
  })
  async remove(@Param('id') id: string): Promise<IResponse<ICount>> {
    return await this.certificateService.deleteOne(id);
  }
}
