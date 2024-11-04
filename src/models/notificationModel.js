import Joi from 'joi'
const NOTIFICATION_COLLECTION = 'notifications'
const notificationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  teacherId: Joi.string().required()
})

export const notificationModel = {
  NOTIFICATION_COLLECTION,
  notificationSchema
}