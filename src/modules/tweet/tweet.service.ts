import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
// import { TweetRepository } from './providers/tweet.repository';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Tweet } from './model/tweet.model';
import { UserRepository } from '../user/providers/user.repository';
import { TweetRepository } from './providers/tweet.repository';

@Injectable()
export class TweetService {
  constructor(
    private readonly tweetRepo: TweetRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async create(
    createTweetDto: CreateTweetDto,
    req: Request,
  ): Promise<IResponse<Tweet>> {
    try {
      const { tweetId } = createTweetDto;
      const tweets = await this.tweetRepo.findAll();
      let noPinnedTweet = true;
      tweets.forEach((tweet) => {
        if (tweet.isPinned) {
          noPinnedTweet = false;
        }
      });
      const newTweet = await this.tweetRepo.create({
        tweetId: tweetId.trim(),
        isPinned: tweets.length === 0 || noPinnedTweet ? true : false,
      });
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Tweet added successfully',
        data: newTweet,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse<Tweet[]>> {
    try {
      const tweets = await this.tweetRepo.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Tweets retrieved successfully',
        data: tweets,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<IResponse<Tweet>> {
    try {
      const tweet = await this.tweetRepo.findById(id);
      if (!tweet) {
        throw new HttpException('Tweet not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Tweet retrieved successfully',
        data: tweet,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findPinnedTweet(): Promise<IResponse<Tweet>> {
    try {
      const tweet = await this.tweetRepo.findPinnedTweet();
      if (!tweet) {
        throw new HttpException(
          'No pinned tweet not found',
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Tweet retrieved successfully',
        data: tweet,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async togglePin(id: string): Promise<IResponse<Tweet>> {
    try {
      const tweet = await this.tweetRepo.findById(id);
      if (!tweet) {
        throw new HttpException('Tweet not found', HttpStatus.NOT_FOUND);
      }
      const pinnedTweet = await this.tweetRepo.findPinnedTweet();
      if (pinnedTweet && pinnedTweet.id !== tweet.id) {
        await this.tweetRepo.update(pinnedTweet.id, { isPinned: false });
      }

      const newTweet = await this.tweetRepo.update(id, {
        isPinned: !tweet.isPinned,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Tweet updated successfully',
        data: newTweet[1][0],
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
      const count = await this.tweetRepo.deleteOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Tweet deleted successfully',
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
