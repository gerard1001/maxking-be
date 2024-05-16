import { Module, forwardRef } from '@nestjs/common';
import { TestimonialService } from './testimonial.service';
import { TestimonialController } from './testimonial.controller';
import { TestimonialRepository } from './providers/testimonial.repository';
import { testimonialProviders } from 'src/database/providers/entities.providers';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ArticleModule } from '../article/article.module';
import { CommentModule } from '../comment/comment.module';
import { ReplyModule } from '../reply/reply.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => ArticleModule),
    forwardRef(() => CommentModule),
    forwardRef(() => ReplyModule),
  ],
  controllers: [TestimonialController],
  providers: [
    TestimonialService,
    TestimonialRepository,
    ...testimonialProviders,
  ],
  exports: [TestimonialService, TestimonialRepository, ...testimonialProviders],
})
export class TestimonialModule {}
