import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleRepository } from './providers/article.repository';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { TagRepository } from '../tag/providers/tag.repository';
import { ArticleTagRepository } from '../article_tag/providers/article_tag.repository';
import { UserRepository } from '../user/providers/user.repository';
import { CloudinaryService } from 'src/core/upload/cloudinary/cloudinary.service';
import { checkStringDuplicatesInArray } from 'src/core/functions/algorithms.function';
import { DeleteArticlesDto } from './dto/delete-article.dto';
import { Article } from './model/article.model';
import { FeatureArticlesDto } from './dto/feature-article.dto';
import { CourseRepository } from '../course/providers/course.repository';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepo: ArticleRepository,
    private readonly tagRepo: TagRepository,
    private readonly courseRepo: CourseRepository,
    private readonly articleTagRepo: ArticleTagRepository,
    private readonly userRepo: UserRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createArticleDto: CreateArticleDto,
    coverImage: Express.Multer.File,
    req: Request,
  ): Promise<IResponse<Article>> {
    try {
      const {
        title,
        description,
        body,
        tags = [],
        newTags = [],
      } = createArticleDto;
      let createdTags = [];
      const userId = req['user'].id;
      const user = await this.userRepo.findById(userId);
      const articleExists = await this.articleRepo.findByTitle(title.trim());
      if (articleExists) {
        throw new HttpException(
          'This article title already exists',
          HttpStatus.CONFLICT,
        );
      }
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      if (checkStringDuplicatesInArray(newTags.map((tag) => tag.trim()))) {
        throw new HttpException(
          'You cannot add duplicate tags',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (checkStringDuplicatesInArray(tags)) {
        throw new HttpException(
          'You cannot add duplicate tags',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (tags?.length === 0 && newTags?.length === 0) {
        throw new HttpException(
          'You must provide at least one tag',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (tags?.length + newTags?.length > 3) {
        throw new HttpException(
          'You can only add 3 tags to an article',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (tags?.length > 0) {
        for (const tag of tags) {
          const tagExists = await this.tagRepo.findById(tag);
          if (!tagExists) {
            throw new HttpException(
              `Tag with id: ${tag} does not exist`,
              HttpStatus.NOT_FOUND,
            );
          }
        }
      }
      if (newTags?.length > 0) {
        for (const tag of newTags) {
          const tagExists = await this.tagRepo.findByName(tag.trim());
          if (tagExists) {
            throw new HttpException(
              `Tag: ${tag.trim()} already exists`,
              HttpStatus.CONFLICT,
            );
          }
          const newTag = await this.tagRepo.create({ name: tag.trim() });
          createdTags.push(newTag.id);
        }
      }

      const updatedTags = [...tags, ...createdTags];
      const file =
        req['file'] &&
        (await this.cloudinaryService.uploadImage(coverImage).catch((err) => {
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }));
      const newArticle = await this.articleRepo.create({
        title: title.trim(),
        description,
        body,
        coverImage: req['file'] && file?.secure_url,
        authorId: user.id,
      });

      for (const tag of updatedTags) {
        const articleTagExists =
          await this.articleTagRepo.findByArticleAndTagId(newArticle.id, tag);
        if (articleTagExists) {
          throw new HttpException(
            `This article already has a tag with id: ${tag}`,
            HttpStatus.CONFLICT,
          );
        }

        await this.articleTagRepo.create({
          articleId: newArticle.id,
          tagId: tag,
        });
      }

      return {
        statusCode: HttpStatus.CREATED,
        message: `Article created successfully`,
        data: newArticle,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse<Article[]>> {
    try {
      const articles = await this.articleRepo.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Articles retrieved successfully',
        data: articles,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findSaved(req: any): Promise<IResponse<Article[]>> {
    try {
      const id = req['user'].id;
      const user = await this.userRepo.findById(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const articles = await this.articleRepo.findSavedArticles(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'User Saved articles retrieved successfully',
        data: articles,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findFeatured(): Promise<IResponse<Article[]>> {
    try {
      const articles = await this.articleRepo.findFeaturedArticles();
      return {
        statusCode: HttpStatus.OK,
        message: 'Featured articles retrieved successfully',
        data: articles,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<IResponse<Article>> {
    try {
      const article = await this.articleRepo.findById(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Article retrieved successfully',
        data: article,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByRelatedArticleTags(
    articleId: string,
  ): Promise<IResponse<Article[]>> {
    try {
      const article = await this.articleRepo.findById(articleId);
      if (!article) {
        throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
      }
      const articleTags = article.tags?.map((tag) => tag.id) || [];
      const relatedArticles = await this.articleRepo.findByRelatedArticleTags(
        articleId,
        articleTags,
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'Articles retrieved successfully',
        data: relatedArticles,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByRelatedCourseTags(
    courseId: string,
  ): Promise<IResponse<Article[]>> {
    try {
      const course = await this.courseRepo.findById(courseId);
      if (!course) {
        throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
      }
      const courseTags = course.tags?.map((tag) => tag.id) || [];
      const relatedArticles =
        await this.articleRepo.findByRelatedCourseTags(courseTags);

      return {
        statusCode: HttpStatus.OK,
        message: 'Articles retrieved successfully',
        data: relatedArticles,
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
    updateArticleDto: UpdateArticleDto,
    coverImage: Express.Multer.File,
    req: Request,
  ): Promise<IResponse<Article>> {
    try {
      const article = await this.articleRepo.findById(id);
      if (!article) {
        throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
      }
      const articleTags = article.tags?.map((tag) => tag.id) || [];
      const {
        title,
        description,
        body,
        tags = [...articleTags],
        newTags = [],
      } = updateArticleDto;

      let createdTags = [];

      if (checkStringDuplicatesInArray(newTags.map((tag) => tag.trim()))) {
        throw new HttpException(
          'You cannot add duplicate tags',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (checkStringDuplicatesInArray(tags)) {
        throw new HttpException(
          'You cannot add duplicate tags',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (tags?.length === 0 && newTags?.length === 0) {
        throw new HttpException(
          'You must provide at least one tag',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (articleTags?.length > 0) {
        for (const articleTag of articleTags) {
          await this.articleTagRepo.deleteByArticleAndTagId(id, articleTag);
        }
      }

      if (tags.includes) {
      }
      if (tags?.length + newTags?.length > 3) {
        throw new HttpException(
          'You can only add 3 tags to an article',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (tags?.length > 0) {
        for (const tag of tags) {
          const tagExists = await this.tagRepo.findById(tag);
          if (!tagExists) {
            throw new HttpException(
              `Tag with id: ${tag} does not exist`,
              HttpStatus.NOT_FOUND,
            );
          }
        }
      }
      if (newTags?.length > 0) {
        for (const tag of newTags) {
          const tagExists = await this.tagRepo.findByName(tag?.trim());
          if (tagExists) {
            throw new HttpException(
              `Tag: ${tag?.trim()} already exists, remove it from the list or change it`,
              HttpStatus.CONFLICT,
            );
          }
          const newTag = await this.tagRepo.create({ name: tag?.trim() });
          createdTags.push(newTag.id);
        }
      }
      const file =
        req['file'] &&
        (await this.cloudinaryService.uploadImage(coverImage).catch((err) => {
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }));

      for (const tag of createdTags) {
        const articleTagExists =
          await this.articleTagRepo.findByArticleAndTagId(article.id, tag);
        if (articleTagExists) {
          throw new HttpException(
            `This article already has a tag with id: ${tag}`,
            HttpStatus.CONFLICT,
          );
        }
      }
      const updatedTags = [...tags, ...createdTags];

      const newArticle = await this.articleRepo.update(id, {
        title: title?.trim(),
        description,
        body,
        coverImage: req['file'] ? file?.secure_url : article.coverImage,
      });

      for (const tag of updatedTags) {
        const articleTagExists =
          await this.articleTagRepo.findByArticleAndTagId(
            newArticle[1][0].id,
            tag,
          );
        if (articleTagExists) {
          throw new HttpException(
            `This article already has a tag with id: ${tag}`,
            HttpStatus.CONFLICT,
          );
        }
        await this.articleTagRepo.create({
          articleId: newArticle[1][0].id,
          tagId: tag,
        });
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Updated article successfuly',
        data: newArticle[1][0],
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateFeatured(
    id: string,
    featureArticlesDto: FeatureArticlesDto,
  ): Promise<IResponse<Article>> {
    try {
      const { isFeatured } = featureArticlesDto;
      const article = await this.articleRepo.findById(id);
      if (!article) {
        throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
      }
      if (article.isFeatured === isFeatured) {
        throw new HttpException(
          `Article is already ${isFeatured ? 'featured' : 'not featured'}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const featuredArticles = await this.articleRepo.findFeaturedArticles();

      if (isFeatured && featuredArticles.length >= 5) {
        try {
          const earlyFeaturedArticle = featuredArticles.reduce((prev, curr) => {
            if (prev.updatedAt < curr.updatedAt) {
              return prev;
            } else {
              return curr;
            }
          });

          await this.articleRepo.update(earlyFeaturedArticle.id, {
            isFeatured: false,
          });
        } catch (error) {
          throw new HttpException(
            'You can only feature 5 articles at a time',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      const newArticle = await this.articleRepo.update(id, {
        isFeatured,
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Updated article successfuly',
        data: newArticle[1][0],
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
      const count = await this.articleRepo.deleteOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Article deleted successfully',
        data: { count },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteMultiple(
    deleteArticlesDto: DeleteArticlesDto,
  ): Promise<IResponse<ICount>> {
    try {
      const count = await this.articleRepo.deleteMultiple(
        deleteArticlesDto.ids,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Article(s) deleted successfully',
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
