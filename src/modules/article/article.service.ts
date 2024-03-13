import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleRepository } from './providers/article.repository';
import { IResponse } from 'src/core/interfaces/response.interface';
import { TagRepository } from '../tag/providers/tag.repository';
import { log } from 'console';
import { ArticleTagRepository } from '../article_tag/providers/article_tag.repository';
import { UserRepository } from '../user/providers/user.repository';
import { CloudinaryService } from 'src/core/upload/cloudinary/cloudinary.service';
import { checkStringDuplicatesInArray } from 'src/core/functions/algorithms.functions';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepo: ArticleRepository,
    private readonly tagRepo: TagRepository,
    private readonly articleTagRepo: ArticleTagRepository,
    private readonly userRepo: UserRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createArticleDto: CreateArticleDto,
    coverImage: Express.Multer.File,
    req: Request,
  ): Promise<IResponse> {
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

      for (const tag of tags) {
        createdTags.push(tag);
      }
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

      for (const tag of createdTags) {
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

  async findAll(): Promise<IResponse> {
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

  async findOne(id: string): Promise<IResponse> {
    const article = await this.articleRepo.findById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Article retrieved successfully',
      data: article,
    };
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
