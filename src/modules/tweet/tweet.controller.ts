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
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UserAuthGuard } from 'src/core/guards/auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Tweet } from './model/tweet.model';
import { TweetService } from './tweet.service';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Post()
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: false,
    roles: [
      ENUM_ROLE_TYPE.SUPER_ADMIN,
      ENUM_ROLE_TYPE.ADMIN,
      ENUM_ROLE_TYPE.MANAGER,
    ],
  })
  async create(
    @Body() createTweetDto: CreateTweetDto,
    @Req() req: Request,
  ): Promise<IResponse<Tweet>> {
    return await this.tweetService.create(createTweetDto, req);
  }

  @Get()
  findAll(): Promise<IResponse<Tweet[]>> {
    return this.tweetService.findAll();
  }

  @Get('pinned')
  async findPinnedTweet(): Promise<IResponse<Tweet>> {
    return await this.tweetService.findPinnedTweet();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IResponse<Tweet>> {
    return this.tweetService.findById(id);
  }

  @Get('toggle-pin/:id')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: false,
    roles: [
      ENUM_ROLE_TYPE.SUPER_ADMIN,
      ENUM_ROLE_TYPE.ADMIN,
      ENUM_ROLE_TYPE.MANAGER,
    ],
  })
  async togglePin(@Param('id') id: string): Promise<IResponse<Tweet>> {
    return await this.tweetService.togglePin(id);
  }

  @Delete(':id')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: true,
    roles: [
      ENUM_ROLE_TYPE.SUPER_ADMIN,
      ENUM_ROLE_TYPE.ADMIN,
      ENUM_ROLE_TYPE.MANAGER,
      ENUM_ROLE_TYPE.CLIENT,
    ],
  })
  async remove(@Param('id') id: string): Promise<IResponse<ICount>> {
    return await this.tweetService.deleteOne(id);
  }
}
