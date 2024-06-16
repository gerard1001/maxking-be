import * as Joi from 'joi';

export const createProgramValidation = Joi.object({
  title: Joi.string().required().trim().max(150).min(4),
  short: Joi.string().required().trim().max(20),
  description: Joi.string().empty('').trim(),
});
