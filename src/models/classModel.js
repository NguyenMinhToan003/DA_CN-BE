import Joi from 'joi'
import { REGEX_OBJECTID, MESSAGE_OBJECID } from '../utils/regexs'
const CLASS_SCHEMA = Joi.object({
  tenLop: Joi.string().required().min(3).max(30),
  maLop: Joi.string().required().min(3).max(30),
  gv_id: Joi.string().required().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID),
  sv_ids: Joi.array().items(Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID)),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required()
})

export const classModel = {
  CLASS_SCHEMA
}