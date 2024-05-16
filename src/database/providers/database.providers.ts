import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, PRODUCTION, TEST } from 'src/core/constants';
import { databaseConfig } from '../database.config';
import { User } from 'src/modules/user/model/user.model';
import { Role } from 'src/modules/role/model/role.model';
import { UserRole } from 'src/modules/user_role/models/user_role.model';
import { Article } from 'src/modules/article/model/article.model';
import { UserArticle } from 'src/modules/user_article/model/user_article.model';
import { Tag } from 'src/modules/tag/model/tag.model';
import { ArticleTag } from 'src/modules/article_tag/model/article_tag.model';
import { Profile } from 'src/modules/profile/model/profile.model';
import { Comment } from 'src/modules/comment/model/comment.model';
import { Reply } from 'src/modules/reply/model/reply.model';
import { Category } from 'src/modules/category/model/category.model';
import { Subject } from 'src/modules/subject/model/subject.model';
import { Course } from 'src/modules/course/model/course.model';
import { Module } from 'src/modules/module/model/module.model';
import { Question } from 'src/modules/question/model/question.model';
import { UserCourse } from 'src/modules/user_course/model/user_course.model';
import { CourseTag } from 'src/modules/course_tag/model/course_tag.model';
import { UserModule } from 'src/modules/user_module/model/user_module.model';
import { Chapter } from 'src/modules/chapter/model/chapter.model';
import { Like } from 'src/modules/like/model/like.model';
import { Testimonial } from 'src/modules/testimonial/model/testimonial.model';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config: any;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([
        User,
        Profile,
        Role,
        UserRole,
        Article,
        UserArticle,
        Tag,
        ArticleTag,
        Comment,
        Reply,
        Like,
        Category,
        Subject,
        Course,
        Module,
        Question,
        UserCourse,
        UserModule,
        CourseTag,
        Chapter,
        Testimonial,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
