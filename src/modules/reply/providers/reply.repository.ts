import { Inject, Injectable } from '@nestjs/common';
import { REPLY_MODEL } from 'src/core/constants';
import { Reply } from '../model/reply.model';
import { UpdateReplyDto } from '../dto/update-reply.dto';
import { User } from 'src/modules/user/model/user.model';
import { Profile } from 'src/modules/profile/model/profile.model';

@Injectable()
export class ReplyRepository {
  constructor(@Inject(REPLY_MODEL) private readonly replyModel: typeof Reply) {}

  async create(createReplyDto: any): Promise<Reply> {
    return await this.replyModel.create(createReplyDto);
  }

  async findAll(): Promise<Reply[]> {
    return await this.replyModel.findAll();
  }

  async findById(id: string) {
    return await this.replyModel.findByPk(id, {
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
    });
  }

  async findByUser(userId: string) {
    return await this.replyModel.findOne({ where: { userId } });
  }

  async findByComment(commentId: string) {
    return await this.replyModel.findOne({ where: { commentId } });
  }

  async update(
    id: string,
    updateReplyDto: UpdateReplyDto,
  ): Promise<[number, Reply[]]> {
    return await this.replyModel.update(updateReplyDto, {
      where: { id },
      returning: true,
    });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.replyModel.destroy({ where: { id } });
  }

  async deleteMultiple(ids: string[]): Promise<number> {
    return await this.replyModel.destroy({ where: { id: ids } });
  }
}
