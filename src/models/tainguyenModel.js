import Joi from 'joi'
import { REGEX_OBJECTID, MESSAGE_OBJECID } from '../utils/regexs'

const TAINGUYEN_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(30),
  sender_id: Joi.string().required().pattern(REGEX_OBJECTID).messages(MESSAGE_OBJECID),
  description: Joi.string().required().min(5).max(255),
  url: Joi.string().required(),
  type: Joi.string().required().valid('img', 'pdf'),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required()
})
export const tainguyenModel = {
  TAINGUYEN_SCHEMA
}