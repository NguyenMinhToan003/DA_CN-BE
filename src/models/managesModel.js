import Joi from 'joi'
import { REGEX_OBJECTID, MESSAGE_OBJECID } from '../utils/regexs'
const MANAGES_COLLECTION = 'manages'
const managesSchema = Joi.object({
  teacherId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),
  studentId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),
  time: Joi.string().required()
})
export const managesModel = {
  MANAGES_COLLECTION,
  managesSchema
}