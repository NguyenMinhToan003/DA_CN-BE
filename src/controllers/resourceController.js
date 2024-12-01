import { StatusCodes } from 'http-status-codes'
import { resourceService } from '../services/resourceService'
const uploadResource = async (req, res, next) => {
  try {
    const { studentId, name, description, topicId } = req.body
    const url = req.files.map(file => file.path)
    const result = await resourceService.uploadResource(url, name, description, topicId, studentId)
    if (result.acknowledged) {
      return res.status(StatusCodes.OK).json(result)
    }
    return res.status(StatusCodes.BAD_REQUEST).json(result)
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}
const getDsResource = async (req, res) => {
  try {
    const { topicId } = req.query
    const result = await resourceService.getDsResource(topicId)
    return res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}
export const resourceController = {
  uploadResource,
  getDsResource
}