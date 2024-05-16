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
import { CreateLikeDto } from './dto/create-like.dto';
import { UserAuthGuard } from 'src/core/guards/auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';
import { UpdateLikeDto } from './dto/update-like.dto';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(':commentId')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: false,
    roles: [
      ENUM_ROLE_TYPE.ADMIN,
      ENUM_ROLE_TYPE.MANAGER,
      ENUM_ROLE_TYPE.MENTOR,
      ENUM_ROLE_TYPE.CLIENT,
    ],
  })
  async create(
    @Body() createLikeDto: CreateLikeDto,
    @Param('commentId') commentId: string,
    @Req() req: Request,
  ): Promise<IResponse<Like>> {
    return this.likeService.create(createLikeDto, commentId, req);
  }

  @Get()
  async findAll(): Promise<IResponse<Like[]>> {
    return await this.likeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse<Like>> {
    return await this.likeService.findById(id);
  }

  @Patch(':id')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: true,
    roles: [ENUM_ROLE_TYPE.SUPER_ADMIN],
  })
  async update(
    @Param('id') id: string,
    @Body() updateLikeDto: UpdateLikeDto,
  ): Promise<IResponse<Like>> {
    return await this.likeService.update(id, updateLikeDto);
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
