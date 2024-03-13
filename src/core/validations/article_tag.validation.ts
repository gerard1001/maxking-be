import * as Joi from 'joi';

export const createArticleTagValidation = Joi.object({
  articleId: Joi.string().uuid().required(),
  tagId: Joi.string().uuid().required(),
});
