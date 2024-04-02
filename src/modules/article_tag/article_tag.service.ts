import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleTagDto } from './dto/create-article_tag.dto';
import { ArticleTagRepository } from './providers/article_tag.repository';
import { TagRepository } from '../tag/providers/tag.repository';
import { ArticleRepository } from '../article/providers/article.repository';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { ArticleTag } from './model/article_tag.model';

@Injectable()
export class ArticleTagService {
  constructor(
    private readonly articleTagRepo: ArticleTagRepository,
    private readonly articleRepo: ArticleRepository,
    private readonly tagRepo: TagRepository,
  ) {}

  async create(
    createArticleTagDto: CreateArticleTagDto,
  ): Promise<IResponse<ArticleTag>> {
    try {
      const { articleId, tagId } = createArticleTagDto;
      const article = await this.articleRepo.findById(articleId);
      if (!article) {
        throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
      }
      const tag = await this.tagRepo.findById(tagId);
      if (!tag) {
        throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
      }
      const articleTag = await this.articleTagRepo.create({
        articleId,
        tagId,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Article tag created successfully',
        data: articleTag,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse<ArticleTag[]>> {
    try {
      const articleTags = await this.articleTagRepo.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Article tags retrieved successfully',
        data: articleTags,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<IResponse<ArticleTag>> {
    try {
      const articleTag = await this.articleTagRepo.findById(id);
      if (!articleTag) {
        throw new HttpException('Article tag not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Article tag retrieved successfully',
        data: articleTag,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByArticleId(articleId: string): Promise<IResponse<ArticleTag[]>> {
    try {
      const article = await this.articleRepo.findById(articleId);
      if (!article) {
        throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
      }
      const articleTags = await this.articleTagRepo.findByArticleId(articleId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Article tags retrieved successfully',
        data: articleTags,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByTagId(tagId: string): Promise<IResponse<ArticleTag[]>> {
    try {
      const tag = await this.tagRepo.findById(tagId);
      if (!tag) {
        throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
      }
      const articleTags = await this.articleTagRepo.findByTagId(tagId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Article tags retrieved successfully',
        data: articleTags,
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
      const articleTag = await this.articleTagRepo.findById(id);
      if (!articleTag) {
        throw new HttpException('Article tag not found', HttpStatus.NOT_FOUND);
      }
      const count = await this.articleTagRepo.deleteOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Article tag deleted successfully',
        data: { count },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteByArticleAndTagId(
    deleteArticleTagDto: CreateArticleTagDto,
  ): Promise<IResponse<ICount>> {
    try {
      const { articleId, tagId } = deleteArticleTagDto;
      const article = await this.articleRepo.findById(articleId);
      if (!article) {
        throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
      }
      const tag = await this.tagRepo.findById(tagId);
      if (!tag) {
        throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
      }
      const count = await this.articleTagRepo.deleteByArticleAndTagId(
        articleId,
        tagId,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Article tag deleted successfully',
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
