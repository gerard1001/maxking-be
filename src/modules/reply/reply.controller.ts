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
import { ReplyService } from './reply.service';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Reply } from './model/reply.model';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UserAuthGuard } from 'src/core/guards/auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';
import { UpdateReplyDto } from './dto/update-reply.dto';

@Controller('reply')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

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
    @Body() createReplyDto: CreateReplyDto,
    @Param('commentId') commentId: string,
    @Req() req: Request,
  ): Promise<IResponse<Reply>> {
    return this.replyService.create(createReplyDto, commentId, req);
  }

  @Get()
  async findAll(): Promise<IResponse<Reply[]>> {
    return await this.replyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse<Reply>> {
    return await this.replyService.findById(id);
  }

  @Patch(':id')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: true,
    roles: [ENUM_ROLE_TYPE.SUPER_ADMIN],
  })
  async update(
    @Param('id') id: string,
    @Body() updateReplyDto: UpdateReplyDto,
  ): Promise<IResponse<Reply>> {
    return await this.replyService.update(id, updateReplyDto);
  }

  @Delete(':id')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: true,
    roles: [ENUM_ROLE_TYPE.SUPER_ADMIN],
  })
  async remove(@Param('id') id: string): Promise<IResponse<ICount>> {
    return await this.replyService.deleteOne(id);
  }

  @Delete()
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: false,
    roles: [ENUM_ROLE_TYPE.SUPER_ADMIN],
  })
  async removeMultiple(@Body() ids: string[]): Promise<IResponse<ICount>> {
    return await this.replyService.deleteMultiple(ids);
  }
}
