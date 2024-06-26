import { Inject, Injectable } from '@nestjs/common';
import { LIKE_MODEL } from 'src/core/constants';
import { Like } from '../model/like.model';
import { User } from 'src/modules/user/model/user.model';
import { Profile } from 'src/modules/profile/model/profile.model';

@Injectable()
export class LikeRepository {
  constructor(@Inject(LIKE_MODEL) private readonly likeModel: typeof Like) {}

  async create(createLikeDto: any): Promise<Like> {
    return await this.likeModel.create(createLikeDto);
  }

  async findAll(): Promise<Like[]> {
    return await this.likeModel.findAll();
  }

  async findById(id: string) {
    return await this.likeModel.findByPk(id, {
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
    });
  }

  async findByUser(userId: string) {
    return await this.likeModel.findOne({ where: { userId } });
  }

  async findByUserAndArticleId(userId: string, articleId: string) {
    return await this.likeModel.findOne({ where: { userId, articleId } });
  }

  async findByUserAndCommentId(userId: string, commentId: string) {
    return await this.likeModel.findOne({ where: { userId, commentId } });
  }

  async findByComment(commentId: string) {
    return await this.likeModel.findOne({ where: { commentId } });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.likeModel.destroy({ where: { id } });
  }

  async deleteMultiple(ids: string[]): Promise<number> {
    return await this.likeModel.destroy({ where: { id: ids } });
  }
}
