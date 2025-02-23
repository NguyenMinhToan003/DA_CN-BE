import Joi from 'joi'
import { MESSAGE_OBJECID, REGEX_OBJECTID } from '../utils/regexs'

const MESSAGE_COLLECTION = 'messages'
const messageSchema = Joi.object({
  _id: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID),
  content: Joi.string().required(),
  senderId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),
  receiverId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),
  sentTo: Joi.string().valid('room', 'user').required(),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(Date.now())
})

export const messageModel = {
  MESSAGE_COLLECTION,
  messageSchema
}