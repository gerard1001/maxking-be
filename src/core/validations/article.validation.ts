import * as Joi from 'joi';

export const createArticleValidation = Joi.object({
  title: Joi.string().required().trim().max(150).min(4),
  description: Joi.string().empty('').trim(),
  body: Joi.string().required(),
  tags: Joi.array().items(Joi.string().uuid()),
  newTags: Joi.array().items(
    Joi.string()
      .trim()
      .regex(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)
      .messages({
        'string.pattern.base': 'Tags can only contain letters',
      }),
  ),
});
