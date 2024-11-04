import Joi from 'joi'
import { MESSAGE_OBJECID, REGEX_OBJECTID } from '../utils/regexs'
const RATE_COLLECTION = 'rates'
const rateSchema = Joi.object({
  rate: Joi.string().valid('accept', 'reject', 'waiting').required(),
  comment: Joi.string().required(),
  resourceId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),
  created_at: Joi.date().timestamp().required(),
  updated_at: Joi.date().timestamp().required()
})
export const rateModel = {
  RATE_COLLECTION,
  rateSchema
}