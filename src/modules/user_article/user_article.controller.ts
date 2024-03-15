import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserArticleService } from './user_article.service';
import { CreateUserArticleDto } from './dto/create-user_article.dto';

@Controller('user-article')
export class UserArticleController {
  constructor(private readonly userArticleService: UserArticleService) {}

  @Post()
  async create(@Body() createUserArticleDto: CreateUserArticleDto) {
    return await this.userArticleService.create(createUserArticleDto);
  }

  @Get()
  async findAll() {
    return await this.userArticleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userArticleService.findById(id);
  }

  @Get('user/:userId/article/:articleId')
  async findByUserIdAndArticleId(
    @Param('userId') userId: string,
    @Param('articleId') articleId: string,
  ) {
    return await this.userArticleService.findByUserIdAndArticleId(
      userId,
      articleId,
    );
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return await this.userArticleService.deleteOne(id);
  }

  @Delete()
  async deleteMultiple(@Body() ids: string[]) {
    return await this.userArticleService.deleteMultiple(ids);
  }
}
