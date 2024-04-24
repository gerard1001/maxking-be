import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
  Req,
} from '@nestjs/common';
import { UserArticleService } from './user_article.service';
import { CreateUserArticleDto } from './dto/create-user_article.dto';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { UserArticle } from './model/user_article.model';
import { UserAuthGuard } from 'src/core/guards/auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';

@Controller('user-article')
export class UserArticleController {
  constructor(private readonly userArticleService: UserArticleService) {}

  @Get(':id')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: false,
    roles: [
      ENUM_ROLE_TYPE.SUPER_ADMIN,
      ENUM_ROLE_TYPE.ADMIN,
      ENUM_ROLE_TYPE.MANAGER,
      ENUM_ROLE_TYPE.MENTOR,
      ENUM_ROLE_TYPE.CLIENT,
    ],
  })
  async create(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<IResponse<UserArticle>> {
    return await this.userArticleService.create(id, req);
  }

  @Get()
  async findAll(): Promise<IResponse<UserArticle[]>> {
    return await this.userArticleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse<UserArticle>> {
    return await this.userArticleService.findById(id);
  }

  @Get('user/:userId/article/:articleId')
  async findByUserIdAndArticleId(
    @Param('userId') userId: string,
    @Param('articleId') articleId: string,
  ): Promise<IResponse<UserArticle>> {
    return await this.userArticleService.findByUserIdAndArticleId(
      userId,
      articleId,
    );
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<IResponse<ICount>> {
    return await this.userArticleService.deleteOne(id);
  }

  @Delete()
  async deleteMultiple(@Body() ids: string[]): Promise<IResponse<ICount>> {
    return await this.userArticleService.deleteMultiple(ids);
  }
}
