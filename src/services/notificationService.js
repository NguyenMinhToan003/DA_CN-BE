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
    let result = await notificationModel.getDsNotificationByTeacher(id)
    if (result.length === 0) result = await notificationModel.getDsNotificationByStudent(id)
    return {
      data: result,
      message : 'Danh sách thông báo'
    }
  }
  catch (error) {
    throw error
  }
}

export const notificationService = {
  sendNotification,
  getDsNotification
}