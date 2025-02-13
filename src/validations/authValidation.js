import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import { REGEX_EMAIL } from '../utils/regexs'

const loginTeacher = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().pattern(REGEX_EMAIL).required(),
    password: Joi.string().required()
  })
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}

const loginStudent = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().pattern(REGEX_EMAIL).required(),
    password: Joi.string().required()
  })
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}

const registerWithTeacher = async (req, res, next) => {

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(REGEX_EMAIL).required(),
    password: Joi.string().required(),
    profile_pic: Joi.string().default('')
  })
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}
const registerWithStudent = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(REGEX_EMAIL).required(),
    password: Joi.string().required(),
    profile_pic: Joi.string().default(''),
    CLASS: Joi.string().required(),
    studentCode: Joi.string().required()
  })
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}
export const authValidation = {
  loginStudent,
  loginTeacher,
  registerWithTeacher,
  registerWithStudent
}