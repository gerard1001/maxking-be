import { Inject, Injectable } from '@nestjs/common';
import { COMMENT_MODEL } from 'src/core/constants';
import { Comment } from '../model/comment.model';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { User } from 'src/modules/user/model/user.model';
import { Profile } from 'src/modules/profile/model/profile.model';
import { Reply } from 'src/modules/reply/model/reply.model';
import { Like } from 'src/modules/like/model/like.model';

@Injectable()
export class CommentRepository {
  constructor(
    @Inject(COMMENT_MODEL) private readonly commentModel: typeof Comment,
  ) {}

  async create(createCommentDto: any): Promise<Comment> {
    return await this.commentModel.create(createCommentDto);
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentModel.findAll();
  }

  async findById(id: string) {
    return await this.commentModel.findByPk(id, {
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
        {
          model: Reply,
          as: 'replies',
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

  async findByUser(userId: string) {
    return await this.commentModel.findOne({ where: { userId } });
  }

  async findByArticle(articleId: string): Promise<Comment[]> {
    return await this.commentModel.findAll({
      where: { articleId },
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
        {
          model: Like,
          as: 'likes',
          attributes: ['id', 'createdAt', 'updatedAt'],
          include: [
            {
              model: User,
              as: 'liker',
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

  async update(
    id: string,
    updateArticleDto: UpdateCommentDto,
  ): Promise<[number, Comment[]]> {
    return await this.commentModel.update(updateArticleDto, {
      where: { id },
      returning: true,
    });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.commentModel.destroy({ where: { id } });
  }

  async deleteMultiple(ids: string[]): Promise<number> {
    return await this.commentModel.destroy({ where: { id: ids } });
  }
}
