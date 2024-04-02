import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserArticleService } from './user_article.service';
import { CreateUserArticleDto } from './dto/create-user_article.dto';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { UserArticle } from './model/user_article.model';

@Controller('user-article')
export class UserArticleController {
  constructor(private readonly userArticleService: UserArticleService) {}

  @Post()
  async create(
    @Body() createUserArticleDto: CreateUserArticleDto,
  ): Promise<IResponse<UserArticle>> {
    return await this.userArticleService.create(createUserArticleDto);
  }

  @Get()
  async findAll(): Promise<IResponse<UserArticle[]>> {
    return await this.userArticleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse<UserArticle>> {
    return await this.userArticleService.findById(id);
  }

  @Get('user/:userId/article/:articleId')
  async findByUserIdAndArticleId(
    @Param('userId') userId: string,
    @Param('articleId') articleId: string,
  ): Promise<IResponse<UserArticle>> {
    return await this.userArticleService.findByUserIdAndArticleId(
      userId,
      articleId,
    );
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<IResponse<ICount>> {
    return await this.userArticleService.deleteOne(id);
  }

  @Delete()
  async deleteMultiple(@Body() ids: string[]): Promise<IResponse<ICount>> {
    return await this.userArticleService.deleteMultiple(ids);
  }
}
