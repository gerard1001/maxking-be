import { Inject, Injectable } from '@nestjs/common';
import { ARTICLE_MODEL } from 'src/core/constants';
import { Article } from '../model/article.model';
import { Tag } from 'src/modules/tag/model/tag.model';
import { User } from 'src/modules/user/model/user.model';
import { Profile } from 'src/modules/profile/model/profile.model';
import { Comment } from 'src/modules/comment/model/comment.model';
import { Op } from 'sequelize';

@Injectable()
export class ArticleRepository {
  constructor(
    @Inject(ARTICLE_MODEL) private readonly articleModel: typeof Article,
  ) {}

  async create(createArticleDto: any): Promise<Article> {
    return await this.articleModel.create(createArticleDto);
  }

  async findAll(): Promise<Article[]> {
    return await this.articleModel.findAll({
      include: [
        {
          model: Tag,
          as: 'tags',
          // attributes: ['id', 'name'],
          through: { attributes: [] },
        },
        {
          model: User,
          as: 'author',
          attributes: [
            'id',
            'firstName',
            'lastName',
            'email',
            'createdAt',
            'updatedAt',
          ],
          include: [
            {
              model: Profile,
              as: 'profile',
              attributes: ['picture', 'city', 'country'],
            },
          ],
        },
      ],
    });
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
          include: [
            {
              model: Profile,
              as: 'profile',
              attributes: ['picture', 'city', 'country'],
            },
          ],
        },
        {
          model: Comment,
          as: 'comments',
          attributes: ['id', 'text', 'createdAt', 'updatedAt'],
          include: [
            {
              model: User,
              as: 'writer',
              attributes: ['id', 'firstName', 'lastName', 'email'],
              include: [
                {
                  model: Profile,
                  as: 'profile',
                  attributes: ['picture', 'city', 'country'],
                },
              ],
            },
          ],
        },
      ],
    });
  }

  async findByTitle(title: string) {
    return await this.articleModel.findOne({ where: { title } });
  }

  async findFeaturedArticles(): Promise<Article[]> {
    return await this.articleModel.findAll({ where: { isFeatured: true } });
  }

  async findByRelatedArticleTags(
    articleId: string,
    tagIds: string[],
  ): Promise<Article[]> {
    return await this.articleModel.findAll({
      where: {
        id: { [Op.not]: articleId },
        '$tags.id$': { [Op.in]: tagIds },
      },
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
          attributes: [
            'id',
            'firstName',
            'lastName',
            'email',
            'createdAt',
            'updatedAt',
          ],
          include: [
            {
              model: Profile,
              as: 'profile',
              attributes: ['picture', 'city', 'country'],
            },
          ],
        },
      ],
    });
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
