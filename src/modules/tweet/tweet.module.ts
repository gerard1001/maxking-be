import { Module, forwardRef } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { tweetProviders } from 'src/database/providers/entities.providers';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ArticleModule } from '../article/article.module';
import { CommentModule } from '../comment/comment.module';
import { ReplyModule } from '../reply/reply.module';
import { TweetService } from './tweet.service';
import { TweetRepository } from './providers/tweet.repository';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => ArticleModule),
    forwardRef(() => CommentModule),
    forwardRef(() => ReplyModule),
  ],
  controllers: [TweetController],
  providers: [TweetService, TweetRepository, ...tweetProviders],
  exports: [TweetService, TweetRepository, ...tweetProviders],
})
export class TweetModule {}
