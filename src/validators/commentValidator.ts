import * as Joi from 'joi';

export const commentValidator = {
    comment: Joi.object({
        id: Joi.number(),
        text: Joi.string().required(),
        like: Joi.number().min(0).required(),
        dislike: Joi.number().min(0).required(),
        authorId: Joi.number().min(0).required(),
        postId: Joi.number().min(0).required(),
        title: Joi.string().required(),
    }),
};
