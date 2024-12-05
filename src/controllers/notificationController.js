import { StatusCodes } from 'http-status-codes'
import { notificationService } from '../services/notificationService'

const sendNotification = async (req, res) => {
  try {
    const { title, description, teacherId } = req.body
    const result = await notificationService.sendNotification(title, description, teacherId)
    res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}
const getDsNotification = async (req, res) => {
  try {
    const { id } = req.query
    const result = await notificationService.getDsNotification(id)
    res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}
export const notificationController = {
  sendNotification,
  getDsNotification
}