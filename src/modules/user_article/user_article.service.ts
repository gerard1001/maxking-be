import { Injectable } from '@nestjs/common';
import { CreateUserArticleDto } from './dto/create-user_article.dto';
import { UpdateUserArticleDto } from './dto/update-user_article.dto';

@Injectable()
export class UserArticleService {
  create(createUserArticleDto: CreateUserArticleDto) {
    return 'This action adds a new userArticle';
  }

  findAll() {
    return `This action returns all userArticle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userArticle`;
  }

  update(id: number, updateUserArticleDto: UpdateUserArticleDto) {
    return `This action updates a #${id} userArticle`;
  }

  remove(id: number) {
    return `This action removes a #${id} userArticle`;
  }
}
