import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UserAuthGuard } from 'src/core/guards/auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Document } from './model/document.model';
import { DocumentService } from './document.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/core/upload/multer.config';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

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
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createDocumentDto: CreateDocumentDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ): Promise<IResponse<Document>> {
    return await this.documentService.create(createDocumentDto, file, req);
  }

  @Get()
  findAll(): Promise<IResponse<Document[]>> {
    return this.documentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IResponse<Document>> {
    return this.documentService.findById(id);
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
    return await this.documentService.deleteOne(id);
  }
}
