import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import { REGEX_OBJECTID, MESSAGE_OBJECID } from '../utils/regexs.js'
const studentRegisterTopic = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    tech: Joi.string().required(),
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
const studentRegisterTeacher = async (req, res, next) => {
  const schema = Joi.object({
    teacherId: Joi.string().required().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID),
    studentId: Joi.string().required().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID)
  })
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}
const getStudentDetail = async (req, res, next) => {
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

const getAllStudent = async (req, res, next) => {
  const schema = Joi.object({
    page: Joi.number().required(),
    limit: Joi.number().required()
  })
  try {
    await schema.validateAsync(req.query, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}

const searchStudent = async (req, res, next) => {
  try {
    const schema = Joi.object({
      key: Joi.string().required(),
      type: Joi.string().required().valid(
        'name', 'email', 'studentCode', 'CLASS', 'status', 'all'),
      page: Joi.number().required(),
      limit: Joi.number().required()
    })
    await schema.validateAsync(req.query, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}

export const studentValidation = {
  studentRegisterTopic,
  studentRegisterTeacher,
  getStudentDetail,
  getAllStudent,
  searchStudent
}
