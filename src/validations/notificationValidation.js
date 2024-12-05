import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
const sendNotification = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    teacherId: Joi.string().required()
  })
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}
const getDsNotification = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required()
  })
  try {
    await schema.validateAsync(req.query, { abortEarly: false })
    next()
  }
  catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}
export const notificationValidation = {
  sendNotification,
  getDsNotification
}