import Joi from 'joi'
import { REGEX_OBJECTID, MESSAGE_OBJECID } from '../utils/regexs.js'
const RESOURCE_COLLECTION = 'resources'

const resourceSchema = Joi.object({
  url: Joi.string().required(),
  note: Joi.string().required(),
  week: Joi.number().required(),
  topicId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(Date.now())
})
export const resourceModel = {
  RESOURCE_COLLECTION,
  resourceSchema
}