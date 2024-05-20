import { Inject, Injectable } from '@nestjs/common';
import { TWEET_MODEL } from 'src/core/constants';
import { Tweet } from '../model/tweet.model';
import { CreateTweetDto } from '../dto/create-tweet.dto';
import { UpdateTweetDto } from '../dto/update-tweet.dto';
import { User } from 'src/modules/user/model/user.model';
import { Profile } from 'src/modules/profile/model/profile.model';

@Injectable()
export class TweetRepository {
  constructor(
    @Inject(TWEET_MODEL)
    private readonly tweetModel: typeof Tweet,
  ) {}

  async create(createTweetDto: CreateTweetDto): Promise<Tweet> {
    return await this.tweetModel.create(createTweetDto);
  }

  async findAll(): Promise<Tweet[]> {
    return await this.tweetModel.findAll();
  }

  async findById(id: string) {
    return await this.tweetModel.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName'],
          include: [
            {
              model: Profile,
              as: 'profile',
              attributes: ['picture', 'city', 'country'],
            },
          ],
        },
      ],
    });
  }

  async findPinnedTweet(): Promise<Tweet> {
    return await this.tweetModel.findOne({
      where: { isPinned: true },
    });
  }

  async update(
    id: string,
    updateTweetDto: UpdateTweetDto,
  ): Promise<[number, Tweet[]]> {
    return await this.tweetModel.update(updateTweetDto, {
      where: { id },
      returning: true,
    });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.tweetModel.destroy({ where: { id } });
  }
}
