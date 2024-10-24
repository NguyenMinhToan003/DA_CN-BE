import Joi from 'joi'
import { REGEX_OBJECTID, MESSAGE_OBJECID } from '../utils/regexs'

const DETAI_SCHEMA = Joi.object({
  author_id: Joi.string().required().regex(REGEX_OBJECTID).message(MESSAGE_OBJECID),
  loaiDoan_id: Joi.string().required().regex(REGEX_OBJECTID).message(MESSAGE_OBJECID),
  name: Joi.string().required().min(3).max(30),
  description: Joi.string().required().min(5).max(255),
  tech_stack: Joi.string().required(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required()
})

export const detaiModel = {
  DETAI_SCHEMA
}