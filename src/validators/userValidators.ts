import * as Joi from 'joi';
import { regexp } from '../сonstans/regexp';

export const userValidators = {
    crateUser: Joi.object({
        firstName: Joi.string().min(2).max(20).required(),
        lastName: Joi.string().min(2).max(20).required(),
        age: Joi.number().min(18).max(100).required(),
        phone: Joi.string().regex(regexp.PHONE).required(),
        email: Joi.string().regex(regexp.EMAIL).required(),
        password: Joi.string().regex(regexp.PASSWORD).required(),
    }),
    loginUser: Joi.object({
        email: Joi.string().regex(regexp.EMAIL).required(),
        password: Joi.string().required(),
    }),

};
