import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CommentRepository } from './providers/comment.repository';
import { UserRepository } from '../user/providers/user.repository';
import { ArticleRepository } from '../article/providers/article.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Comment } from './model/comment.model';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepo: CommentRepository,
    private readonly userRepo: UserRepository,
    private readonly articleRepo: ArticleRepository,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    articleId: string,
    req: Request,
  ): Promise<IResponse<Comment>> {
    try {
      const { text } = createCommentDto;
      const userId = req['user'].id;
      const user = await this.userRepo.findById(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const article = await this.articleRepo.findById(articleId);
      if (!article) {
        throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
      }

      const newComment = await this.commentRepo.create({
        text,
        userId,
        articleId,
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Comment created successfully',
        data: newComment,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse<Comment[]>> {
    try {
      const comments = await this.commentRepo.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Comments fetched successfully',
        data: comments,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<IResponse<Comment>> {
    try {
      const comment = await this.commentRepo.findById(id);
      if (!comment) {
        throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Comment retrieved successfully',
        data: comment,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByUser(userId: string): Promise<IResponse<Comment>> {
    try {
      const user = await this.userRepo.findById(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const comment = await this.commentRepo.findByUser(userId);
      if (!comment) {
        throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Comment retrieved successfully',
        data: comment,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByArticle(articleId: string): Promise<IResponse<Comment>> {
    try {
      const article = await this.articleRepo.findById(articleId);
      if (!article) {
        throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
      }
      const comment = await this.commentRepo.findByArticle(articleId);
      if (!comment) {
        throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Comment retrieved successfully',
        data: comment,
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
    updateCommentDto: UpdateCommentDto,
  ): Promise<IResponse<Comment>> {
    try {
      const comment = await this.commentRepo.findById(id);
      if (!comment) {
        throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
      }
      const updatedComment = await this.commentRepo.update(
        id,
        updateCommentDto,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Comment updated successfully',
        data: updatedComment[1][0],
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
      const comment = await this.commentRepo.findById(id);
      if (!comment) {
        throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
      }
      const count = await this.commentRepo.deleteOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Comment deleted successfully',
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
      const count = await this.commentRepo.deleteMultiple(ids);
      return {
        statusCode: HttpStatus.OK,
        message: 'Comments deleted successfully',
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
