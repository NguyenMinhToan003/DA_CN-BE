import Joi from 'joi'
import { REGEX_OBJECTID, MESSAGE_OBJECID } from '../utils/regexs'

const DETAI_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(30),
  description: Joi.string().required().min(5).max(255),
  teacher_id: Joi.string().required().pattern(REGEX_OBJECTID).messages(MESSAGE_OBJECID),
  student_id: Joi.string().required().pattern(REGEX_OBJECTID).messages(MESSAGE_OBJECID),
  tech_stack: Joi.string().required(),
  status: Joi.string().required().valid('đã xác nhận', 'chưa xác nhận', 'không hợp lệ'),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required()
})

export const detaiModel = {
  DETAI_SCHEMA
}