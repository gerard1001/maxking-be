import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './modules/profile/profile.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { UserRoleModule } from './modules/user_role/user_role.module';
import { ArticleModule } from './modules/article/article.module';
import { TagModule } from './modules/tag/tag.module';
import { ArticleTagModule } from './modules/article_tag/article_tag.module';
import { UserArticleModule } from './modules/user_article/user_article.module';
import { ConfigModule } from '@nestjs/config';
import { CommentModule } from './modules/comment/comment.module';
import configuration from 'config/configuration';
import { ReplyModule } from './modules/reply/reply.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './core/strategies/jwt.strategy';
// import { CacheModule } from '@nestjs/cache-manager';
import { CategoryModule } from './modules/category/category.module';
import { SubjectModule } from './modules/subject/subject.module';
import { CourseModule } from './modules/course/course.module';
import { ModuleModule } from './modules/module/module.module';
import { QuestionModule } from './modules/question/question.module';
import { UserCourseModule } from './modules/user_course/user_course.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PassportModule.register({ session: true }),

    DatabaseModule,
    ProfileModule,
    AuthModule,
    UserModule,
    RoleModule,
    UserRoleModule,
    ArticleModule,
    TagModule,
    ArticleTagModule,
    UserArticleModule,
    CommentModule,
    ReplyModule,
    CategoryModule,
    SubjectModule,
    CourseModule,
    ModuleModule,
    QuestionModule,
    UserCourseModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
