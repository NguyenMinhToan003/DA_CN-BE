import Joi from 'joi'
const NOTIFICATION_COLLECTION = 'notifications'
const notificationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  teacherId: Joi.string().required(),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(Date.now())
})
export const notificationModel = {
  NOTIFICATION_COLLECTION,
  notificationSchema
}