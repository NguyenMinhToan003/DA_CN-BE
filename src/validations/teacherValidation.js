import Joi from 'joi'
import { REGEX_OBJECTID, MESSAGE_OBJECID } from '../utils/regexs'
import { StatusCodes } from 'http-status-codes'
const confirmStudents = async (req, res, next) => {
  const schema = Joi.object({
    teacherId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),
    studentIds: Joi.array().items(Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID)).required()
  })
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
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
    process: Joi.number(),
    topic: Joi.number().valid(-1, 0, 1).default(-1)
  })
  try {
    await schema.validateAsync(req.query, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}

const getStudentsByTeacherKey = async (req, res, next) => {
  const schema = Joi.object({
    key: Joi.string().default(-1),
    teacherId: Joi.string().required().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID),
    topic: Joi.number().valid(-1, 0, 1).default(-1)
  })
  try {
    await schema.validateAsync(req.query, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}

const teacherCreateTopic = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    tech: Joi.string().required(),
    teacherId: Joi.string().required().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID),
    studentIds: Joi.array().items(Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID)).required()
  })
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}

export const teacherValidation = {
  confirmStudents,
  getStudentsByTeacherId,
  getStudentsByTeacherKey,
  teacherCreateTopic
}