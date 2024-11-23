import { StatusCodes } from 'http-status-codes'
import { resourceService } from '../services/resourceService'

const uploadResource = async (req, res, next) => {
  try {
    const { url, name, description, topicId, studentId } = req.body
    const result = await resourceService.uploadResource(url, name, description, topicId, studentId)
    return res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}


export const resourceController = {
  uploadResource
}