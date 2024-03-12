import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserArticleService } from './user_article.service';
import { CreateUserArticleDto } from './dto/create-user_article.dto';
import { UpdateUserArticleDto } from './dto/update-user_article.dto';

@Controller('user-article')
export class UserArticleController {
  constructor(private readonly userArticleService: UserArticleService) {}

  @Post()
  create(@Body() createUserArticleDto: CreateUserArticleDto) {
    return this.userArticleService.create(createUserArticleDto);
  }

  @Get()
  findAll() {
    return this.userArticleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userArticleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserArticleDto: UpdateUserArticleDto) {
    return this.userArticleService.update(+id, updateUserArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userArticleService.remove(+id);
  }
}
