import Joi from 'joi'
import { GET_DB } from '../configs/mongodb'
import { studentModel } from './StudentModel'
import { ObjectId } from 'mongodb'
const TOPIC_COLLECTION = 'topics'
const topicSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  tech: Joi.string().required(),
  process: Joi.number().default(0),
  status: Joi.array().default([
    'đang chờ',
    'đang thực hiện',
    'đã hoàn thành',
    'từ chối'
  ]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(Date.now())
})
const create = async (studentId, data) => {
  try {
    const student = await GET_DB().collection(studentModel.STUDENT_COLLECTION).findOne(
      { _id: new ObjectId(studentId) }
    )
    if (!student) return { message: 'Sinh viên không tồn tại' }
    if (!student.teacherId) return { message: 'Chưa chọn giảng viên' }
    if (student.topicId) return { message: 'Sinh viên đã có đề tài rồi' }
    data = await topicSchema.validateAsync(data, { abortEarly: false })
    const topic = await GET_DB().collection(TOPIC_COLLECTION).insertOne(data)
    return topic
  }
  catch (error) {
    throw error
  }
}
const findTopicById = async (id) => {
  try {
    const topic = await GET_DB().collection(TOPIC_COLLECTION).findOne({ _id: id })
    if (!topic) return { message: 'Đề tài không tồn tại' }
    return topic
  }
  catch (error) {
    throw error
  }
}
export const topicModel = {
  TOPIC_COLLECTION,
  topicSchema,
  create,
  findTopicById
}