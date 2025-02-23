import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { MESSAGE_OBJECID, REGEX_OBJECTID } from '../utils/regexs'

const createRoom = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      description: Joi.string().min(3).required(),
      teacherId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),

    })
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}

const getRoom = async (req, res, next) => {
  try {
    const schema = Joi.object({
      roomId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),
      userId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required()
    })
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}
const joinRoom = async (req, res, next) => {
  try {
    const schema = Joi.object({
      roomId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),
      teacherId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),
      members: Joi.array().items(Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID)).required(),
      role: Joi.string().valid('teacher', 'student').required()
    })

    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}

const deleteRoom = async (req, res, next) => {
  try {
    const schema = Joi.object({
      roomId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),
      teacherId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required()
    })
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}

export const roomValidation = {
  createRoom,
  getRoom,
  joinRoom,
  deleteRoom
}