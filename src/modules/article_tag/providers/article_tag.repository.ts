import { Inject, Injectable } from '@nestjs/common';
import { ARTICLE_TAG_MODEL } from 'src/core/constants';
import { ArticleTag } from '../model/article_tag.model';
import { CreateArticleTagDto } from '../dto/create-article_tag.dto';

@Injectable()
export class ArticleTagRepository {
  constructor(
    @Inject(ARTICLE_TAG_MODEL)
    private readonly articleTagModel: typeof ArticleTag,
  ) {}

  async create(createArticleTagDto: CreateArticleTagDto): Promise<ArticleTag> {
    return await this.articleTagModel.create(createArticleTagDto);
  }

  async findAll(): Promise<ArticleTag[]> {
    return await this.articleTagModel.findAll({
      attributes: ['id', 'articleId', 'tagId', 'createdAt', 'updatedAt'],
    });
  }

  async findById(id: string): Promise<ArticleTag> {
    return await this.articleTagModel.findByPk(id);
  }

  async findByArticleAndTagId(
    articleId: string,
    tagId: string,
  ): Promise<ArticleTag> {
    return await this.articleTagModel.findOne({
      where: { articleId, tagId },
    });
  }

  async findByArticleId(articleId: string): Promise<ArticleTag[]> {
    return await this.articleTagModel.findAll({
      where: { articleId },
      include: [
        {
          all: true,
        },
      ],
    });
  }

  async findByTagId(tagId: string): Promise<ArticleTag[]> {
    return await this.articleTagModel.findAll({
      where: { tagId },
    });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.articleTagModel.destroy({ where: { id } });
  }

  async deleteByArticleAndTagId(
    articleId: string,
    tagId: string,
  ): Promise<number> {
    return await this.articleTagModel.destroy({
      where: { articleId, tagId },
    });
  }
}
