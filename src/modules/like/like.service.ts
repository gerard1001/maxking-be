import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LikeRepository } from './providers/like.repository';
import { UserRepository } from '../user/providers/user.repository';
import { CommentRepository } from '../comment/providers/comment.repository';
import { CreateLikeDto } from './dto/create-like.dto';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Like } from './model/like.model';
import { UpdateLikeDto } from './dto/update-like.dto';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepo: LikeRepository,
    private readonly userRepo: UserRepository,
    private readonly commentRepo: CommentRepository,
  ) {}

  async create(
    createLikeDto: CreateLikeDto,
    commentId: string,
    req: Request,
  ): Promise<IResponse<Like>> {
    try {
      const { text } = createLikeDto;
      const userId = req['user'].id;
      const user = await this.userRepo.findById(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const comment = await this.commentRepo.findById(commentId);
      if (!comment) {
        throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
      }

      const newLike = await this.likeRepo.create({
        text,
        userId,
        commentId,
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Like created successfully',
        data: newLike,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse<Like[]>> {
    try {
      const likes = await this.likeRepo.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Replies fetched successfully',
        data: likes,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<IResponse<Like>> {
    try {
      const like = await this.likeRepo.findById(id);
      if (!like) {
        throw new HttpException('Like not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Like retrieved successfully',
        data: like,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByUser(userId: string): Promise<IResponse<Like>> {
    try {
      const user = await this.userRepo.findById(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const like = await this.likeRepo.findByUser(userId);
      if (!like) {
        throw new HttpException('Like not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Like retrieved successfully',
        data: like,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByComment(commentId: string): Promise<IResponse<Like>> {
    try {
      const comment = await this.commentRepo.findById(commentId);
      if (!comment) {
        throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
      }
      const like = await this.likeRepo.findByComment(commentId);
      if (!like) {
        throw new HttpException('Like not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Like retrieved successfully',
        data: like,
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
    updateLikeDto: UpdateLikeDto,
  ): Promise<IResponse<Like>> {
    try {
      const like = await this.likeRepo.findById(id);
      if (!like) {
        throw new HttpException('Like not found', HttpStatus.NOT_FOUND);
      }
      const updatedLike = await this.likeRepo.update(id, updateLikeDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Like updated successfully',
        data: updatedLike[1][0],
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
      const like = await this.likeRepo.findById(id);
      if (!like) {
        throw new HttpException('Like not found', HttpStatus.NOT_FOUND);
      }
      const count = await this.likeRepo.deleteOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Like deleted successfully',
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
      const count = await this.likeRepo.deleteMultiple(ids);
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
