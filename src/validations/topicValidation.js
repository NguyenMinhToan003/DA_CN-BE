import Joi from 'joi'
import { REGEX_OBJECTID, MESSAGE_OBJECID } from '../utils/regexs'
import { StatusCodes } from 'http-status-codes'
const createTopic = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    tech: Joi.string().required(),
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
const joinTopic = async (req, res, next) => {
  const schema = {
    topicId: Joi.string().required().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID),
    studentIds: Joi.array().items(Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID)).required().min(1)
  }
  try {
    await Joi.object(schema).validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}
const getTopicById = async (req, res, next) => {
  const schema = {
    id: Joi.string().required().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID)
  }
  try {
    await Joi.object(schema).validateAsync(req.query, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}
const getTopicByTeacherId = async (req, res, next) => {
  const schema = {
    id: Joi.string().required().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID)
  }
  try {
    await Joi.object(schema).validateAsync(req.query, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}
const confirmTopic = async (req, res, next) => {
  const schema = {
    teacherId: Joi.string().required().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID),
    topicId: Joi.string().required().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID)
  }
  try {
    await Joi.object(schema).validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}
const createEmptyTopic = async (req, res, next) => {
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
const getDetailTopicById = async (req, res, next) => {
  const schema = {
    id: Joi.string().required().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID)
  }
  try {
    await Joi.object(schema).validateAsync(req.query, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}
const updateTopic = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    tech: Joi.string().required(),
    process: Joi.number().required(),
    id: Joi.string().required().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID),
    teacherId: Joi.string().required().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID)
  })
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}
const deleteTopic = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID),
    teacherId: Joi.string().required().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID)
  })
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}
const removeStudent = async (req, res, next) => {
  const schema = Joi.object({
    topicId: Joi.string().required().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID),
    studentId: Joi.string().required().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID),
    teacherId: Joi.string().required().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID)
  })
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}

export const topicValidation = {
  createTopic,
  joinTopic,
  getTopicById,
  getTopicByTeacherId,
  confirmTopic,
  createEmptyTopic,
  getDetailTopicById,
  updateTopic,
  deleteTopic,
  removeStudent
}