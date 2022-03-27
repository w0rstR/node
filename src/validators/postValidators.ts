import * as Joi from 'joi';

export const postValidators = {
    post: Joi.object({
        id: Joi.number(),
        text: Joi.string().required(),
        title: Joi.string().required(),
        userId: Joi.number().required(),
    }),

    updatePost: Joi.object({
        id: Joi.number(),
        text: Joi.string().required(),
        title: Joi.string().required(),
    }),
};
