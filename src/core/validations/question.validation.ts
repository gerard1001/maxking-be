import * as Joi from 'joi';

export const createQuestionValidation = Joi.object({
  question: Joi.string().required().empty().min(1).max(100),
  choices: Joi.array()
    .items(
      Joi.object({
        choice: Joi.string().max(50).required(),
        index: Joi.number().integer().min(1).required(),
      }),
    )
    .max(5)
    .required(),
  trueAnswer: Joi.string().required().empty().max(50),
});
