import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Comment } from './model/comment.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserAuthGuard } from 'src/core/guards/auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':articleId')
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
    @Body() createCommentDto: CreateCommentDto,
    @Param('articleId') articleId: string,
    @Req() req: Request,
  ): Promise<IResponse<Comment>> {
    return this.commentService.create(createCommentDto, articleId, req);
  }

  @Get()
  async findAll(): Promise<IResponse<Comment[]>> {
    return await this.commentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse<Comment>> {
    return await this.commentService.findById(id);
  }

  @Patch(':id')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: true,
    roles: [ENUM_ROLE_TYPE.SUPER_ADMIN],
  })
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<IResponse<Comment>> {
    return await this.commentService.update(id, updateCommentDto);
  }

  @Get('article/:articleId')
  async findByArticleId(
    @Param('articleId') articleId: string,
  ): Promise<IResponse<Comment[]>> {
    return await this.commentService.findByArticle(articleId);
  }

  @Delete(':id')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: true,
    roles: [ENUM_ROLE_TYPE.SUPER_ADMIN],
  })
  async remove(@Param('id') id: string): Promise<IResponse<ICount>> {
    return await this.commentService.deleteOne(id);
  }

  @Delete()
  @SetMetadata('metadata', {
    checkAccOwner: false,
    roles: [ENUM_ROLE_TYPE.SUPER_ADMIN, ENUM_ROLE_TYPE.ADMIN],
  })
  async removeMultiple(@Body() ids: string[]): Promise<IResponse<ICount>> {
    return await this.commentService.deleteMultiple(ids);
  }
}
