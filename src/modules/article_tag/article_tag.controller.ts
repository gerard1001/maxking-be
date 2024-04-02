import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArticleTagService } from './article_tag.service';
import { CreateArticleTagDto } from './dto/create-article_tag.dto';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { ArticleTag } from './model/article_tag.model';

@Controller('article-tag')
export class ArticleTagController {
  constructor(private readonly articleTagService: ArticleTagService) {}

  @Post()
  async create(
    @Body() createArticleTagDto: CreateArticleTagDto,
  ): Promise<IResponse<ArticleTag>> {
    return await this.articleTagService.create(createArticleTagDto);
  }

  @Get()
  async findAll(): Promise<IResponse<ArticleTag[]>> {
    return await this.articleTagService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse<ArticleTag>> {
    return await this.articleTagService.findById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponse<ICount>> {
    return await this.articleTagService.deleteOne(id);
  }

  @Delete()
  async deleteByArticleAndTagId(
    @Body() deleteArticleTagDto: CreateArticleTagDto,
  ): Promise<IResponse<ICount>> {
    return await this.articleTagService.deleteByArticleAndTagId(
      deleteArticleTagDto,
    );
  }
}
