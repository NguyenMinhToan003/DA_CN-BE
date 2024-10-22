import Joi from 'joi'
import { REGEX_OBJECTID, MESSAGE_OBJECID } from '../utils/regexs'
const USER_SCHEMA = Joi.object({
  username: Joi.string().required().min(3).max(30),
  code: Joi.string().required().length(10),
  email: Joi.string().email().required().pattern(REGEX_OBJECTID).messages(MESSAGE_OBJECID),
  password: Joi.string().required(),
  gender: Joi.boolean().required(),
  birth: Joi.date().required(),
  class: Joi.string().required().min(3).max(7),
  phone: Joi.string().required().pattern().messages({}),
  address: Joi.string().required().min(5).max(100),
  profile_picture: Joi.string().required(),
  role: Joi.string().required().valid('teacher', 'student'),
  status: Joi.string().required().valid('active', 'inactive'),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required()
})
export const userModel = {
  USER_SCHEMA
}