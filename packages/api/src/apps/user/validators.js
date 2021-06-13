import Joi from '@hapi/joi'
import { id as validator_id } from '../../helpers/validators'


export const get = {
  params: Joi.object({
    id: validator_id
  })
}
