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
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/core/upload/multer.config';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';
import { ValidationPipe } from 'src/core/pipes/validation.pipe';
import { createArticleValidation } from 'src/core/validations/article.validation';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    accOwner: {
      checkAccOwner: false,
      allowAnyRole: false,
      accOwnerRoles: [],
    },
    roles: [
      ENUM_ROLE_TYPE.SUPER_ADMIN,
      ENUM_ROLE_TYPE.ADMIN,
      ENUM_ROLE_TYPE.MANAGER,
      ENUM_ROLE_TYPE.MENTOR,
    ],
  })
  @UsePipes(new ValidationPipe(createArticleValidation))
  @UseInterceptors(FileInterceptor('coverImage', multerOptions))
  async create(
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFile() coverImage: Express.Multer.File,
    @Req() req: Request,
  ) {
    return this.articleService.create(createArticleDto, coverImage, req);
  }

  @Get()
  async findAll() {
    return await this.articleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.articleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
