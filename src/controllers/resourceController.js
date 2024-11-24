import { StatusCodes } from 'http-status-codes'
import { resourceService } from '../services/resourceService'
import { uploadImage } from '../utils/uploadCloundinary'
const uploadResource = async (req, res, next) => {
  try {
    const filePath = await uploadImage(req.file.path)

    const { name, description, topicId, studentId } = req.body
    const url = filePath.secure_url
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