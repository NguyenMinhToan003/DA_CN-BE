import Joi from 'joi'
const ROOMCHAT_SCHEMA = Joi.object({
  room_name: Joi.string().required().min(3).max(30),
  members: Joi.array().items(Joi.string().required().pattern(REGEX_OBJECTID).messages(MESSAGE_OBJECID)),
  author: Joi.string().required().pattern(REGEX_OBJECTID).messages(MESSAGE_OBJECID),
  admins: Joi.array().items(Joi.string().required().pattern(REGEX_OBJECTID).messages(MESSAGE_OBJECID)),
  profile_picture: Joi.string().required(),
  status: Joi.boolean().required(),
  note: Joi.string().required().min(5).max(255),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required()
})

export const roomchatModel = {
  ROOMCHAT_SCHEMA
}