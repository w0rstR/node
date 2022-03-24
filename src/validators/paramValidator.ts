import * as Joi from 'joi';

export const paramValidator = {
    id: Joi.object({
        id: Joi.string().required(),
    }),
};
