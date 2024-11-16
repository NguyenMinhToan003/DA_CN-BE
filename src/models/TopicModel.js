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
    await GET_DB().collection(studentModel.STUDENT_COLLECTION).updateOne(
      { _id: new ObjectId(studentId) },
      {
        $set: {
          topicId: new ObjectId(topic.insertedId),
          updatedAt: data.updatedAt
        }
      }
    )
    return topic
  }
  catch (error) {
    throw error
  }
}

const findTopicById = async (id) => {
  try {
    const topic = await GET_DB().collection(TOPIC_COLLECTION).findOne({ _id: new ObjectId(id) })
    if (!topic) return { message: 'Đề tài không tồn tại' }
    return topic
  }
  catch (error) {
    throw error
  }
}
const student_topic = async (id, data) => {
  try {
    const user = await GET_DB().collection(studentModel.STUDENT_COLLECTION).findOne(
      { _id: new ObjectId(id) }
    )
    if (!user)
      return { message: 'Sinh viên không tồn tại' }
    if (user.topicId)
      return { message: 'Sinh viên đã chọn đề tài' }
    const topic = await GET_DB().collection(topicModel.TOPIC_COLLECTION).findOne(
      { _id: new ObjectId(data.topicId) }
    )
    if (!topic)
      return { message: 'Đề tài không tồn tại' }
    const owerTopic = await GET_DB().collection(studentModel.STUDENT_COLLECTION).findOne(
      { topicId: new ObjectId(data.topicId) }
    )
    if (owerTopic?.teacherId?.toString() !== user?.teacherId?.toString())
      return { message: 'Giáo Viên hướng dẫn không khớp' }
    const result = await GET_DB().collection(studentModel.STUDENT_COLLECTION).updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          topicId: new ObjectId(data.topicId),
          updatedAt: data.updatedAt
        }
      }
    )
    return { ...result, message: 'Chọn đề tài thành công' }
  }
  catch (error) {
    throw error
  }
}
const findTopicByTeacherId = async (id) => {
  try {
    const students = await GET_DB().collection(studentModel.STUDENT_COLLECTION).find(
      { teacherId: new ObjectId(id) }
    ).toArray()
    const topicIds = students.map(student => new ObjectId(student.topicId))
    const topics = await GET_DB().collection(TOPIC_COLLECTION).find(
      { _id: { $in: topicIds } }
    ).toArray()
    return topics
  }
  catch (error) {
    throw error
  }
}
const confirmTopic = async (ids) => {
  try {
    const result = await GET_DB().collection(TOPIC_COLLECTION).updateMany(
      { _id: { $in: ids.map(id => new ObjectId(id)) } },
      {
        $set: {
          process: 1,
          updatedAt: Date.now()
        }
      }
    )
    return result
  }
  catch (error) {
    throw error
  }
}
export const topicModel = {
  TOPIC_COLLECTION,
  topicSchema,
  create,
  findTopicById,
  student_topic,
  findTopicByTeacherId,
  confirmTopic
}