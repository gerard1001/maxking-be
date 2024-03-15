import { Inject, Injectable } from '@nestjs/common';
import { ARTICLE_MODEL } from 'src/core/constants';
import { Article } from '../model/article.model';
import { Tag } from 'src/modules/tag/model/tag.model';
import { User } from 'src/modules/user/model/user.model';

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
      include: [
        {
          model: Tag,
          as: 'tags',
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
      ],
    });
  }

  async findByTitle(title: string) {
    return await this.articleModel.findOne({ where: { title } });
  }

  async update(
    id: string,
    updateArticleDto: any,
  ): Promise<[number, Article[]]> {
    return await this.articleModel.update(updateArticleDto, {
      where: { id },
      returning: true,
    });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.articleModel.destroy({ where: { id } });
  }

  async deleteMultiple(ids: string[]): Promise<number> {
    return await this.articleModel.destroy({ where: { id: ids } });
  }
}
