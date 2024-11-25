import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import { REGEX_OBJECTID, MESSAGE_OBJECID } from '../utils/regexs.js'
const student_topic = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    tech: Joi.string().required(),
    teacherId: Joi.string().required().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID),
    id: Joi.string().required().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID)
  })
  try {
    await schema.validateAsync(req.query, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}
const student_teacher = async (req, res, next) => {
  const schema = Joi.object({
    teacherId: Joi.string().required().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID),
    id: Joi.string().required().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID)
  })
  try {
    await schema.validateAsync(req.query, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}
const getStudentsByTeacherId = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID),
    status: Joi.number(),
    process: Joi.number()
  })
  try {
    await schema.validateAsync(req.query, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}
const getStudent = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID)
  })
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}
export const studentValidation = {
  student_topic,
  student_teacher,
  getStudent,
  getStudentsByTeacherId
}
