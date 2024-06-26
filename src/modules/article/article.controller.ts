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
import { UserAuthGuard } from 'src/core/guards/auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';
import { ValidationPipe } from 'src/core/pipes/validation.pipe';
import { createArticleValidation } from 'src/core/validations/article.validation';
import { DeleteArticlesDto } from './dto/delete-article.dto';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Article } from './model/article.model';
import { FeatureArticlesDto } from './dto/feature-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

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
  @UsePipes(new ValidationPipe(createArticleValidation))
  @UseInterceptors(FileInterceptor('coverImage', multerOptions))
  async create(
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFile() coverImage: Express.Multer.File,
    @Req() req: Request,
  ): Promise<IResponse<Article>> {
    return this.articleService.create(createArticleDto, coverImage, req);
  }

  @Get()
  async findAll(): Promise<IResponse<Article[]>> {
    return await this.articleService.findAll();
  }

  @Get('saved')
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
  async findSaved(@Req() req: any): Promise<IResponse<Article[]>> {
    return await this.articleService.findSaved(req);
  }

  @Get('featured')
  async findFeatured(): Promise<IResponse<Article[]>> {
    return await this.articleService.findFeatured();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse<Article>> {
    return await this.articleService.findOne(id);
  }

  @Get(':id/related')
  async findByRelatedArticleTags(
    @Param('id') id: string,
  ): Promise<IResponse<Article[]>> {
    return await this.articleService.findByRelatedArticleTags(id);
  }

  @Get(':id/related/course')
  async findByRelatedCourseTags(
    @Param('id') id: string,
  ): Promise<IResponse<Article[]>> {
    return await this.articleService.findByRelatedCourseTags(id);
  }

  @Patch(':id')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: true,
    roles: [ENUM_ROLE_TYPE.SUPER_ADMIN, ENUM_ROLE_TYPE.ADMIN],
  })
  @UseInterceptors(FileInterceptor('coverImage', multerOptions))
  update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @UploadedFile() coverImage: Express.Multer.File,
    @Req() req: Request,
  ): Promise<IResponse<Article>> {
    return this.articleService.update(id, updateArticleDto, coverImage, req);
  }

  @Patch('feature/:id')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: false,
    roles: [
      ENUM_ROLE_TYPE.SUPER_ADMIN,
      ENUM_ROLE_TYPE.ADMIN,
      ENUM_ROLE_TYPE.MANAGER,
    ],
  })
  async updateFeatured(
    @Param('id') id: string,
    @Body() featureArticlesDto: FeatureArticlesDto,
  ): Promise<IResponse<Article>> {
    return await this.articleService.updateFeatured(id, featureArticlesDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string): Promise<IResponse<ICount>> {
    return this.articleService.deleteOne(id);
  }

  @Delete()
  deleteMultiple(
    @Body() deleteArticlesDto: DeleteArticlesDto,
  ): Promise<IResponse<ICount>> {
    return this.articleService.deleteMultiple(deleteArticlesDto);
  }
}
