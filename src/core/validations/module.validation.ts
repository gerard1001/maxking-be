import * as Joi from 'joi';

export const createModuleValidation = Joi.object({
  title: Joi.string().required().trim().max(150).min(4),
  description: Joi.string().empty('').trim(),
  content: Joi.string().required(),
});
