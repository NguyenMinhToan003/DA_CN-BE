import Joi from 'joi'
import { REGEX_OBJECTID, MESSAGE_OBJECID } from '../utils/regexs'

const MESSAGE_SCHEMA = Joi.object({
  roomchat_id: Joi.string().required().pattern(REGEX_OBJECTID).messages(MESSAGE_OBJECID),
  sender_id: Joi.string().required().pattern(REGEX_OBJECTID).messages(MESSAGE_OBJECID),
  receiver_id: Joi.string().required().pattern(REGEX_OBJECTID).messages(MESSAGE_OBJECID),
  content: Joi.string().required().min(1).max(255),
  type: Joi.string().required().valid('text', 'image', 'file'),
  status: Joi.boolean().required(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required()
})

export const messageModel = {
  MESSAGE_SCHEMA
}