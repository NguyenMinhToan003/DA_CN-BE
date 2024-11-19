import Joi from 'joi'
import { GET_DB } from '../configs/mongodb'
import { studentModel } from './StudentModel'
import { ObjectId } from 'mongodb'
import { teacherModel } from './teacherModel'
import { MESSAGE_OBJECID, REGEX_OBJECTID } from '../utils/regexs'
const TOPIC_COLLECTION = 'topics'
const topicSchema = Joi.object({
  _id: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID),
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
    if (student.status === 0) return { message: 'Chưa đăng kí giáo viên thành công' }
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
const student_topic = async (id, studentIds) => {
  try {
    const topic = await GET_DB().collection(TOPIC_COLLECTION).findOne({ _id: new ObjectId(id) })
    if (!topic) return { message: 'Đề tài không tồn tại' }
    const students = await GET_DB().collection(studentModel.STUDENT_COLLECTION).find(
      { _id: { $in: studentIds.map(id => new ObjectId(id)) } }
    ).toArray()

    const isNoMatch = students.some(student => {
      return student?.teacherId === null // chua co giao vien
        || (student?.topicId?.toString() !== id && student?.topicId !== null)// da co de tai khac
        || student.status === 0 // chua xac nhan cua giao vien
    })
    if (isNoMatch) return { message: 'Không thể làm nhóm được' }
    const result = await GET_DB().collection(studentModel.STUDENT_COLLECTION).updateMany(
      { _id: { $in: studentIds.map(id => new ObjectId(id)) } },
      {
        $set: {
          topicId: new ObjectId(id),
          updatedAt: Date.now()
        }
      }
    )
    return { ...result, message: 'Làm nhóm thành công' }
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
const confirmTopic = async (teacherId, topicId) => {
  try {
    const teacher = await GET_DB().collection(teacherModel.TEACHER_COLLECTION).findOne(
      { _id: new ObjectId(teacherId) }
    )
    if (!teacher) return { message: 'Giáo viên không tồn tại' }
    const topic = await GET_DB().collection(TOPIC_COLLECTION).findOne(
      { _id: new ObjectId(topicId) }
    )
    if (!topic) return { message: 'Đề tài không tồn tại' }

    await topicSchema.validateAsync({ ...topic, _id: topic._id.toString() }, { abortEarly: false })
    const result = await GET_DB().collection(TOPIC_COLLECTION).updateOne(
      { _id: new ObjectId(topicId) },
      {
        $set: {
          process: 1
        }
      }
    )
    if (result.modifiedCount === 0) {
      await GET_DB().collection(TOPIC_COLLECTION).updateOne(
        { _id: new ObjectId(topicId) },
        {
          $set: {
            updatedAt: Date.now()
          }
        }
      )
    }
    return result
  }
  catch (error) {
    console.log(error)
  }
}
const createEmptyTopic = async (teacherId, studentId) => {
  try {
    const teacher = await GET_DB().collection(teacherModel.TEACHER_COLLECTION).findOne(
      { _id: new ObjectId(teacherId) }
    )
    if (!teacher) return { message: 'Giáo viên không tồn tại' }
    const student = await GET_DB().collection(studentModel.STUDENT_COLLECTION).findOne(
      { _id: new ObjectId(studentId) }
    )
    if (!student) return { message: 'Sinh viên không tồn tại' }
    if (student.topicId) return { message: 'Sinh viên đã có đề tài rồi' }
    if (student.teacherId.toString() !== teacher._id.toString())
      return { message: 'Sinh viên không thuộc quản lý của giáo viên' }
    const data = {
      name: '',
      description: '',
      tech: '',
      process: 0,
      status: [
        'đang chờ',
        'đang thực hiện',
        'đã hoàn thành',
        'từ chối'
      ],
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
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
const getDetailTopicById = async (id) => {
  try {
    const topic = await GET_DB().collection(TOPIC_COLLECTION).aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: studentModel.STUDENT_COLLECTION,
          localField: '_id',
          foreignField: 'topicId',
          as: 'students'
        }
      }
    ]).toArray()
    return topic
  }
  catch (error) {
    console.log(error)
  }
}
const updateTopic = async (teacherId, topicId, data) => {
  try {
    const teacher = await GET_DB().collection(teacherModel.TEACHER_COLLECTION).findOne(
      { _id: new ObjectId(teacherId) }
    )
    if (!teacher) return { message: 'Giáo viên không tồn tại' }
    const topic = await GET_DB().collection(TOPIC_COLLECTION).findOne(
      { _id: new ObjectId(topicId) }
    )
    if (!topic) return { message: 'Đề tài không tồn tại' }
    const student = await GET_DB().collection(studentModel.STUDENT_COLLECTION).findOne(
      { topicId: new ObjectId(topicId) }
    )
    if (student.teacherId.toString() !== teacher._id.toString())
      return { message: 'Sinh Viên không thuộc quản lý' }
    // if (topic.process !== 0) return { message: 'Đề tài đang thực hiện' }
    data = await topicSchema.validateAsync({ ...data, _id: topicId }, { abortEarly: false })
    const result = await GET_DB().collection(TOPIC_COLLECTION).updateOne(
      { _id: new ObjectId(topicId) },
      {
        $set: {
          name: data.name,
          description: data.description,
          tech: data.tech,
          process: data.process
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
  confirmTopic,
  createEmptyTopic,
  getDetailTopicById,
  updateTopic
}