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

@Controller('article-tag')
export class ArticleTagController {
  constructor(private readonly articleTagService: ArticleTagService) {}

  @Post()
  async create(@Body() createArticleTagDto: CreateArticleTagDto) {
    return await this.articleTagService.create(createArticleTagDto);
  }

  @Get()
  async findAll() {
    return await this.articleTagService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.articleTagService.findById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.articleTagService.deleteOne(id);
  }

  @Delete()
  async deleteByArticleAndTagId(
    @Body() deleteArticleTagDto: CreateArticleTagDto,
  ) {
    return await this.articleTagService.deleteByArticleAndTagId(
      deleteArticleTagDto,
    );
  }
}
