import Joi from 'joi'
import { teacherModel } from './teacherModel'
import { GET_DB } from '../configs/mongodb'
import { ObjectId } from 'mongodb'
const NOTIFICATION_COLLECTION = 'notifications'
const notificationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  teacherId: Joi.string().required(),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(Date.now())
})

const sendNotification = async (title, description, teacherId) => {
  try {
    const teacher = await teacherModel.findTeacherById(teacherId)
    if (!teacher._id) return teacher
    const notification = await notificationSchema.validateAsync({ title, description, teacherId }, { abortEarly: false })
    const result = await GET_DB().collection(NOTIFICATION_COLLECTION).insertOne({
      ...notification,
      teacherId: new ObjectId(teacherId)
    })
    return {
      ...result, message: 'Tin nhắn đã được gửi'
    }
  }
  catch (error) {
    throw error
  }
}
const getDsNotification = async (id) => {
  try {
    return await GET_DB().collection(NOTIFICATION_COLLECTION).aggregate([
      { $match: { teacherId: new ObjectId(id) } }
    ]).toArray()
  }
  catch (error) {
    throw error
  }
}

export const notificationModel = {
  NOTIFICATION_COLLECTION,
  notificationSchema,
  sendNotification,
  getDsNotification
}