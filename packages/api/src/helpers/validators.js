import Joi from '@hapi/joi'
import { objectId } from './regex'


export const id = Joi.object().keys({
  id: Joi.string()
    .regex(objectId)
    .required()
})