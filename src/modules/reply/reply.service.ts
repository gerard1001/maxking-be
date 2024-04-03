import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReplyRepository } from './providers/reply.repository';
import { UserRepository } from '../user/providers/user.repository';
import { CommentRepository } from '../comment/providers/comment.repository';
import { CreateReplyDto } from './dto/create-reply.dto';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Reply } from './model/reply.model';
import { UpdateReplyDto } from './dto/update-reply.dto';

@Injectable()
export class ReplyService {
  constructor(
    private readonly replyRepo: ReplyRepository,
    private readonly userRepo: UserRepository,
    private readonly commentRepo: CommentRepository,
  ) {}

  async create(
    createReplyDto: CreateReplyDto,
    commentId: string,
    req: Request,
  ): Promise<IResponse<Reply>> {
    try {
      const { text } = createReplyDto;
      const userId = req['user'].id;
      const user = await this.userRepo.findById(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const comment = await this.commentRepo.findById(commentId);
      if (!comment) {
        throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
      }

      const newReply = await this.replyRepo.create({
        text,
        userId,
        commentId,
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Reply created successfully',
        data: newReply,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse<Reply[]>> {
    try {
      const replys = await this.replyRepo.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Replies fetched successfully',
        data: replys,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<IResponse<Reply>> {
    try {
      const reply = await this.replyRepo.findById(id);
      if (!reply) {
        throw new HttpException('Reply not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Reply retrieved successfully',
        data: reply,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByUser(userId: string): Promise<IResponse<Reply>> {
    try {
      const user = await this.userRepo.findById(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const reply = await this.replyRepo.findByUser(userId);
      if (!reply) {
        throw new HttpException('Reply not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Reply retrieved successfully',
        data: reply,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByComment(commentId: string): Promise<IResponse<Reply>> {
    try {
      const comment = await this.commentRepo.findById(commentId);
      if (!comment) {
        throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
      }
      const reply = await this.replyRepo.findByComment(commentId);
      if (!reply) {
        throw new HttpException('Reply not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Reply retrieved successfully',
        data: reply,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    updateReplyDto: UpdateReplyDto,
  ): Promise<IResponse<Reply>> {
    try {
      const reply = await this.replyRepo.findById(id);
      if (!reply) {
        throw new HttpException('Reply not found', HttpStatus.NOT_FOUND);
      }
      const updatedReply = await this.replyRepo.update(id, updateReplyDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Reply updated successfully',
        data: updatedReply[1][0],
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteOne(id: string): Promise<IResponse<ICount>> {
    try {
      const reply = await this.replyRepo.findById(id);
      if (!reply) {
        throw new HttpException('Reply not found', HttpStatus.NOT_FOUND);
      }
      const count = await this.replyRepo.deleteOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Reply deleted successfully',
        data: { count },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteMultiple(ids: string[]): Promise<IResponse<ICount>> {
    try {
      const count = await this.replyRepo.deleteMultiple(ids);
      return {
        statusCode: HttpStatus.OK,
        message: 'Replies deleted successfully',
        data: { count },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
