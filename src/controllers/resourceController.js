import { StatusCodes } from 'http-status-codes'
import { resourceService } from '../services/resourceService'

const uploadResource = async (req, res) => {
  try {
    const { studentId, name, description, topicId } = req.body
    const files = req.files.map((file) => ({
      url: file.path, // Đường dẫn file tạm trên máy cục bộ
      public_id: file.filename // Tên file tạm trên máy cục bộ
    }))

    const result = await resourceService.uploadResource(studentId, name, description, topicId, files)

    if ( !result.insertedId )
      return res.status(StatusCodes.BAD_REQUEST).json(result)
    return res.status(StatusCodes.OK).json(result)
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message
    })
  }
}


const getDsResource = async (req, res) => {
  try {
    const { topicId, userId } = req.body
    const result = await resourceService.getDsResource(topicId, userId)
    return res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}

const deleteResource = async (req, res) => {
  try {
    const { resourceId, studentId } = req.body
    const result = await resourceService.deleteResource(resourceId, studentId)
    if (result?.deleteCount === 0)
      return res.status(StatusCodes.BAD_REQUEST).json(result)
    return res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}

const editResource = async (req, res) => {
  try {
    const { resourceId, studentId, name, description } = req.body
    let files = []
    if (req?.files) {
      files = req?.files.map((file) => ({
        url: file.path, // Đường dẫn file tạm trên máy cục bộ
        public_id: file.filename // Tên file tạm trên máy cục bộ
      }))
    }
    const result = await resourceService
      .editResource(resourceId, studentId, name, description, files)
    return res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}

export const resourceController = {
  uploadResource,
  getDsResource,
  deleteResource,
  editResource
}