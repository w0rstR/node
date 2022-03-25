import { Joi } from 'celebrate';
import { regexp } from '../../сonstans/regexp';

export const commonValidator = {
    emailValidator: Joi.string().regex(regexp.EMAIL),
};
