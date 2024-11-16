import { StatusCodes } from 'http-status-codes'
import { topicService } from '../services/topicService'

const createTopic = async (req, res) => {
  try {
    const { name, description, tech, studentId } = req.body
    const data = {
      name,
      description,
      tech,
      studentId
    }
    const result = await topicService.createTopic(data)
    if (!result.insertedId) {
      return res.status(StatusCodes.BAD_REQUEST).json(result)
    }
    return res.status(StatusCodes.CREATED).json(result)
  }
  catch (error) {
    throw error
  }
}
const joinTopic = async (req, res) => {
  try {
    const { topicId, studentId } = req.body
    const data = {
      topicId,
      studentId
    }
    const result = await topicService.joinTopic(data)
    if (result.modifiedCount !== 1) {
      return res.status(StatusCodes.BAD_REQUEST).json(result)
    }
    return res.status(StatusCodes.CREATED).json(result)
  }
  catch (error) {
    throw error
  }
}
const getTopicById = async (req, res) => {
  try {
    const { id } = req.query
    const result = await topicService.getTopicById(id)
    return res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    throw error
  }
}
const getTopicByTeacherId = async (req, res) => {
  try {
    const { id } = req.query
    const result = await topicService.getTopicByTeacherId(id)
    return res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    throw error
  }
}
const confirmTopic = async (req, res) => {
  try {
    const { ids } = req.body
    const result = await topicService.confirmTopic(ids)
    return res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    throw error
  }
}
export const topicController = {
  createTopic,
  joinTopic,
  getTopicById,
  getTopicByTeacherId,
  confirmTopic
}
