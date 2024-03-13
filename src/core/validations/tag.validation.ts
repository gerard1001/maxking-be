import * as Joi from 'joi';

export const createTagValidation = Joi.object({
  name: Joi.string()
    .required()
    .trim()
    .regex(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)
    .messages({
      'string.pattern.base': 'Tags can only contain letters',
    })
    .max(16),
});
