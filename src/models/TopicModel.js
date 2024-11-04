import Joi from 'joi'
const TOPIC_COLLECTION = 'topics'
const topicSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  tech: Joi.string().required(),
  created_at: Joi.date().timestamp().required(),
  updated_at: Joi.date().timestamp().required()
})
export const topicModel = {
  TOPIC_COLLECTION,
  topicSchema
}