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
import { LikeService } from './like.service';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Like } from './model/like.model';
import { UserAuthGuard } from 'src/core/guards/auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Get(':postId')
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
    @Param('postId') postId: string,
    @Req() req: Request,
  ): Promise<IResponse<string>> {
    return await this.likeService.create(postId, req);
  }

  @Get()
  async findAll(): Promise<IResponse<Like[]>> {
    return await this.likeService.findAll();
  }

  @Get('fetch/:id')
  async findOne(@Param('id') id: string): Promise<IResponse<Like>> {
    return await this.likeService.findById(id);
  }

  @Delete(':id')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: true,
    roles: [ENUM_ROLE_TYPE.SUPER_ADMIN],
  })
  async remove(@Param('id') id: string): Promise<IResponse<ICount>> {
    return await this.likeService.deleteOne(id);
  }

  @Delete()
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: false,
    roles: [ENUM_ROLE_TYPE.SUPER_ADMIN],
  })
  async removeMultiple(@Body() ids: string[]): Promise<IResponse<ICount>> {
    return await this.likeService.deleteMultiple(ids);
  }
}
