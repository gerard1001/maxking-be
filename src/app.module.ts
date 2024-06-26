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
import { CategoryModule } from './modules/category/category.module';
import { SubjectModule } from './modules/subject/subject.module';
import { CourseModule } from './modules/course/course.module';
import { ModuleModule } from './modules/module/module.module';
import { QuestionModule } from './modules/question/question.module';
import { UserCourseModule } from './modules/user_course/user_course.module';
import { ChapterModule } from './modules/chapter/chapter.module';
import { UserModuleModule } from './modules/user_module/user_module.module';
import { LikeModule } from './modules/like/like.module';
import { TestimonialModule } from './modules/testimonial/testimonial.module';
import { TweetModule } from './modules/tweet/tweet.module';
import { DocumentModule } from './modules/document/document.module';
import { EventModule } from './modules/event/event.module';
import { CertificateModule } from './modules/certificate/certificate.module';
import { UserCertificateModule } from './modules/user_certificate/user_certificate.module';
import { CollaboratorModule } from './modules/collaborator/collaborator.module';
import { ServiceModule } from './modules/services/service.module';
import { ProgramModule } from './modules/program/program.module';

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
    LikeModule,
    CategoryModule,
    SubjectModule,
    CourseModule,
    ModuleModule,
    QuestionModule,
    UserCourseModule,
    UserModuleModule,
    ChapterModule,
    TestimonialModule,
    TweetModule,
    DocumentModule,
    EventModule,
    CertificateModule,
    UserCertificateModule,
    CollaboratorModule,
    ServiceModule,
    ProgramModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
