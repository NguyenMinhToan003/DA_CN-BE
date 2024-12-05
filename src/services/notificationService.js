import { notificationModel } from '../models/notificationModel'

const sendNotification = async (title, description, teacherId) => {
  try {
    return notificationModel.sendNotification(title, description, teacherId)
  }
  catch (error) {
    throw error
  }
}
const getDsNotification = async (id) => {
  try {
    return notificationModel.getDsNotification(id)
  }
  catch (error) {
    throw error
  }
}

export const notificationService = {
  sendNotification,
  getDsNotification
}