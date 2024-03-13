import { Inject, Injectable } from '@nestjs/common';
import { ARTICLE_MODEL } from 'src/core/constants';
import { Article } from '../model/article.model';

@Injectable()
export class ArticleRepository {
  constructor(
    @Inject(ARTICLE_MODEL) private readonly articleModel: typeof Article,
  ) {}

  async create(createArticleDto: any): Promise<Article> {
    return await this.articleModel.create(createArticleDto);
  }

  async findAll(): Promise<Article[]> {
    return await this.articleModel.findAll();
  }

  async findById(id: string) {
    return await this.articleModel.findByPk(id, {
      include: [{ all: true }],
    });
  }

  async findByTitle(title: string) {
    return await this.articleModel.findOne({ where: { title } });
  }
}
