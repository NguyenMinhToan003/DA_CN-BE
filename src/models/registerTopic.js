import Joi from 'joi'
import { REGEX_OBJECTID, MESSAGE_OBJECID } from '../utils/regexs'
const REGISTER_TOPIC_COLLECTION = 'registerTopics'
const registerTopicSchema = Joi.object({
  studentId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),
  topicId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),
  status: Joi.string().required(),
  created_at: Joi.date().timestamp().required(),
  updated_at: Joi.date().timestamp().required()
})
export const registerTopicModel = {
  REGISTER_TOPIC_COLLECTION,
  registerTopicSchema
}