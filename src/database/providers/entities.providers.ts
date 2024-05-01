import {
  ARTICLE_MODEL,
  ARTICLE_TAG_MODEL,
  CATEGORY_MODEL,
  CHAPTER_MODEL,
  COMMENT_MODEL,
  COURSE_MODEL,
  COURSE_TAG_MODEL,
  MODULE_MODEL,
  PROFILE_MODEL,
  QUESTION_MODEL,
  REPLY_MODEL,
  ROLE_MODEL,
  SUBJECT_MODEL,
  TAG_MODEL,
  USER_ARTICLE_MODEL,
  USER_COURSE_MODEL,
  USER_MODEL,
  USER_MODULE_MODEL,
  USER_ROLE_MODEL,
} from 'src/core/constants';
import { Article } from 'src/modules/article/model/article.model';
import { ArticleTag } from 'src/modules/article_tag/model/article_tag.model';
import { Category } from 'src/modules/category/model/category.model';
import { Chapter } from 'src/modules/chapter/model/chapter.model';
import { Comment } from 'src/modules/comment/model/comment.model';
import { Course } from 'src/modules/course/model/course.model';
import { CourseTag } from 'src/modules/course_tag/model/course_tag.model';
import { Module } from 'src/modules/module/model/module.model';
import { Profile } from 'src/modules/profile/model/profile.model';
import { Question } from 'src/modules/question/model/question.model';
import { Reply } from 'src/modules/reply/model/reply.model';
import { Role } from 'src/modules/role/model/role.model';
import { Subject } from 'src/modules/subject/model/subject.model';
import { Tag } from 'src/modules/tag/model/tag.model';
import { User } from 'src/modules/user/model/user.model';
import { UserArticle } from 'src/modules/user_article/model/user_article.model';
import { UserCourse } from 'src/modules/user_course/model/user_course.model';
import { UserModule } from 'src/modules/user_module/model/user_module.model';
import { UserRole } from 'src/modules/user_role/models/user_role.model';

export const userProviders = [
  {
    provide: USER_MODEL,
    useValue: User,
  },
];

export const profileProviders = [
  {
    provide: PROFILE_MODEL,
    useValue: Profile,
  },
];

export const roleProviders = [
  {
    provide: ROLE_MODEL,
    useValue: Role,
  },
];

export const userRoleProviders = [
  {
    provide: USER_ROLE_MODEL,
    useValue: UserRole,
  },
];

export const tagProviders = [
  {
    provide: TAG_MODEL,
    useValue: Tag,
  },
];

export const articleProviders = [
  {
    provide: ARTICLE_MODEL,
    useValue: Article,
  },
];

export const userArticleProviders = [
  {
    provide: USER_ARTICLE_MODEL,
    useValue: UserArticle,
  },
];

export const articleTagProviders = [
  {
    provide: ARTICLE_TAG_MODEL,
    useValue: ArticleTag,
  },
];

export const commentProviders = [
  {
    provide: COMMENT_MODEL,
    useValue: Comment,
  },
];

export const replyProviders = [
  {
    provide: REPLY_MODEL,
    useValue: Reply,
  },
];

export const categoryProviders = [
  {
    provide: CATEGORY_MODEL,
    useValue: Category,
  },
];

export const subjectProviders = [
  {
    provide: SUBJECT_MODEL,
    useValue: Subject,
  },
];

export const courseProviders = [
  {
    provide: COURSE_MODEL,
    useValue: Course,
  },
];

export const moduleProviders = [
  {
    provide: MODULE_MODEL,
    useValue: Module,
  },
];

export const questionProviders = [
  {
    provide: QUESTION_MODEL,
    useValue: Question,
  },
];

export const userCourseProviders = [
  {
    provide: USER_COURSE_MODEL,
    useValue: UserCourse,
  },
];

export const userModuleProviders = [
  {
    provide: USER_MODULE_MODEL,
    useValue: UserModule,
  },
];

export const courseTagProviders = [
  {
    provide: COURSE_TAG_MODEL,
    useValue: CourseTag,
  },
];

export const chapterProviders = [
  {
    provide: CHAPTER_MODEL,
    useValue: Chapter,
  },
];
