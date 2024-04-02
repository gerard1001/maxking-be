import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserArticleDto } from './dto/create-user_article.dto';
import { UserArticleRepository } from './providers/user_article.repository';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { ArticleRepository } from '../article/providers/article.repository';
import { UserRepository } from '../user/providers/user.repository';
import { UserArticle } from './model/user_article.model';

@Injectable()
export class UserArticleService {
  constructor(
    private readonly userArticleRepo: UserArticleRepository,
    private readonly userRepo: UserRepository,
    private readonly articlRepo: ArticleRepository,
  ) {}

  async create(
    createUserArticleDto: CreateUserArticleDto,
  ): Promise<IResponse<UserArticle>> {
    try {
      const { userId, articleId } = createUserArticleDto;
      const user = await this.userRepo.findById(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const article = await this.userArticleRepo.findById(articleId);
      if (!article) {
        throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
      }
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const userArticle =
        await this.userArticleRepo.create(createUserArticleDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'User article created successfully',
        data: userArticle,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse<UserArticle[]>> {
    try {
      const userArticles = await this.userArticleRepo.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'User articles retrieved successfully',
        data: userArticles,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<IResponse<UserArticle>> {
    try {
      const userArticle = await this.userArticleRepo.findById(id);
      if (!userArticle) {
        throw new HttpException('User article not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'User article retrieved successfully',
        data: userArticle,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByUserIdAndArticleId(
    userId: string,
    articleId: string,
  ): Promise<IResponse<UserArticle>> {
    try {
      const userArticle = await this.userArticleRepo.findByUserIdAndArticleId(
        userId,
        articleId,
      );
      if (!userArticle) {
        throw new HttpException('User article not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'User article retrieved successfully',
        data: userArticle,
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
      const count = await this.userArticleRepo.deleteOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'User article deleted successfully',
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
      for (const id of ids) {
        const userArticle = await this.userArticleRepo.findById(id);
        if (!userArticle) {
          throw new HttpException(
            'User article not found',
            HttpStatus.NOT_FOUND,
          );
        }
      }
      const count = await this.userArticleRepo.deleteMultiple(ids);
      return {
        statusCode: HttpStatus.OK,
        message: 'User articles deleted successfully',
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
