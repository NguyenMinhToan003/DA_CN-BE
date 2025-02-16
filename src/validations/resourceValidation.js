import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { REGEX_OBJECTID, MESSAGE_OBJECID } from '../utils/regexs'

const uploadResource = async (req, res, next) => {
  const schema = Joi.object({
    studentId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    topicId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),
  })

  try {
    // Validate other request body fields
    await schema.validateAsync(req.body, { abortEarly: false })

    next()
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}

const getDsResource = async (req, res, next) => {
  const schema = Joi.object({
    topicId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),
    userId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required()
  })
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}

const deleteResource = async (req, res, next) => {
  const schema = Joi.object({
    resourceId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),
    studentId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),

  })
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}

const editResource = async (req, res, next) => {
  const schema = Joi.object({
    resourceId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),
    studentId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),
    name: Joi.string(),
    description: Joi.string()
  })
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}

export const resourceValidation = {
  uploadResource,
  getDsResource,
  deleteResource,
  editResource
}