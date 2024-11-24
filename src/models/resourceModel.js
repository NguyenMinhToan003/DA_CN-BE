import Joi from 'joi'
import { REGEX_OBJECTID, MESSAGE_OBJECID } from '../utils/regexs.js'
import { GET_DB } from '../configs/mongodb.js'
import { studentModel } from './StudentModel.js'
import { topicModel } from './TopicModel.js'
import { ObjectId } from 'mongodb'
const RESOURCE_COLLECTION = 'resources'

const resourceSchema = Joi.object({
  url: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  topicId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(Date.now())
})
const uploadResource = async (url, name, description, topicId, studentId) => {
  try {
    const student = await studentModel.findStudentById(studentId)
    if (!student) return { message: 'Sinh Viên không tồn tại' }
    const topic = await topicModel.findTopicById(topicId)
    if (!topic) return { message: 'Đề Tài không tồn tại' }
    if (student?.topicId?.toString() !== topicId)
      return { message: 'Sinh Viên không thuộc đề tài' }
    const newResource = await resourceSchema.validateAsync({ url, name, description, topicId },
      { abortEarly: false })
    const result = await GET_DB().collection(RESOURCE_COLLECTION).insertOne(
      { ...newResource, topicId: new ObjectId(newResource.topicId) }
    )
    return { ...result, message: 'Upload Resource thành công' }
  }
  catch (error) {
    throw error
  }
}
export const resourceModel = {
  RESOURCE_COLLECTION,
  resourceSchema,
  uploadResource
}