import * as Joi from 'joi';

export const userRegisterValidation = Joi.object({
  firstName: Joi.string().required().empty().min(1).max(40),
  lastName: Joi.string().required().empty().min(1).max(40),
  email: Joi.string().email().required().empty().max(40),
  password: Joi.string()
    .required()
    .empty()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/)
    .messages({
      'any.required': '{{#label}} field is required',
      'string.base': '{{#label}} must be of type string',
      'string.empty': '{{#label}} can not be empty',
      'string.pattern.base':
        '{{#label}} must contain at least 6 characters including at least one number.',
    }),
});

export const createUserValidation = Joi.object({
  firstName: Joi.string().required().empty().min(1).max(40),
  lastName: Joi.string().required().empty().min(1).max(40),
  email: Joi.string().email().required().empty().max(40),
  roleId: Joi.string().uuid().required(),
});

export const resetPasswordValidation = Joi.object({
  password: Joi.string()
    .required()
    .empty()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/)
    .messages({
      'any.required': '{{#label}} field is required',
      'string.base': '{{#label}} must be of type string',
      'string.empty': '{{#label}} can not be empty',
      'string.pattern.base':
        '{{#label}} must contain at least 6 characters including at least one number.',
    }),
});

export const changePasswordValidation = Joi.object({
  oldPassword: Joi.string().required().empty(),
  password: Joi.string()
    .required()
    .empty()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/)
    .messages({
      'any.required': '{{#label}} field is required',
      'string.base': '{{#label}} must be of type string',
      'string.empty': '{{#label}} can not be empty',
      'string.pattern.base':
        '{{#label}} must contain at least 6 characters including at least one number.',
    }),
});
