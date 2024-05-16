import * as Joi from 'joi';

export const createTestimonialValidation = Joi.object({
  text: Joi.string().required().trim().min(16).max(15000),
});
