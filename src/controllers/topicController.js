import { StatusCodes } from 'http-status-codes'
import { topicService } from '../services/topicService'

const createTopic = async (req, res, next) => {
  try {
    const { name, description, tech, studentId } = req.query
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
const joinTopic = async (req, res, next) => {
  try {
    const { topicId, studentId } = req.query
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
export const topicController = {
  createTopic,
  joinTopic
}
