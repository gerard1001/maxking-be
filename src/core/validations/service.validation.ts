import * as Joi from 'joi';

export const createServiceValidation = Joi.object({
  title: Joi.string().required().trim().max(150).min(4),
  description: Joi.string().empty('').trim(),
  body: Joi.string().required(),
});
