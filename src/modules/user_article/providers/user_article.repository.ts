import { Inject, Injectable } from '@nestjs/common';
import { USER_ARTICLE_MODEL } from 'src/core/constants';
import { UserArticle } from '../model/user_article.model';
import { CreateUserArticleDto } from '../dto/create-user_article.dto';

@Injectable()
export class UserArticleRepository {
  constructor(
    @Inject(USER_ARTICLE_MODEL)
    private readonly userArticleModel: typeof UserArticle,
  ) {}

  async create(
    createUserArticleDto: CreateUserArticleDto,
  ): Promise<UserArticle> {
    return await this.userArticleModel.create(createUserArticleDto);
  }

  async findAll(): Promise<UserArticle[]> {
    return await this.userArticleModel.findAll();
  }

  async findById(id: string): Promise<UserArticle> {
    return await this.userArticleModel.findByPk(id);
  }

  async findByUserIdAndArticleId(
    userId: string,
    articleId: string,
  ): Promise<UserArticle> {
    return await this.userArticleModel.findOne({
      where: { userId, articleId },
    });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.userArticleModel.destroy({ where: { id } });
  }

  async deleteMultiple(ids: string[]): Promise<number> {
    return await this.userArticleModel.destroy({ where: { id: ids } });
  }
}
