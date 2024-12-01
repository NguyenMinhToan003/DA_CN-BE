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
    const student = await studentModel.findStudentById(studentId)
    if (!student._id) return student
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
    const topic = await findTopicById(id)
    if (!topic._id) return topic

    const students = await GET_DB().collection(studentModel.STUDENT_COLLECTION).find(
      { _id: { $in: studentIds.map(id => new ObjectId(id)) } }
    ).toArray()

    for (const student of students) {
      if (!student.teacherId) return { message: 'Sinh viên chưa chọn giáo viên' }
      if (student.topicId && student.topicId.toString() !== id) return { message: 'Sinh viên đã có đề tài rồi' }
      if (student.status === 0) return { message: 'Sinh viên chưa được xác nhận' }
    }

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
  } catch (error) {
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
    const teacher = await teacherModel.findTeacherById(teacherId)
    if (!teacher._id) return teacher
    const topic = await findTopicById(topicId)
    if (!topic._id) return topic
    if (topic.process !== 0) return { message: 'Đề tài đang thực hiện' }
    await topicSchema.validateAsync({ ...topic, _id: topic._id.toString() },
      { abortEarly: false })
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
    const teacher = await teacherModel.findTeacherById(teacherId)
    if (!teacher._id) return teacher
    const student = await studentModel.findStudentById(studentId)
    if (!student._id) return student
    if (student.topicId) return { message: 'Sinh viên đã có đề tài rồi' }
    if (student.teacherId.toString() !== teacher._id.toString())
      return { message: 'Sinh viên không thuộc quản lý của giáo viên' }
    const data = {
      name: '',
      description: '',
      tech: '',
      process: 1,
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
      },
      {
        $project: studentModel.NOSUBMITFIELD
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
const deleteTopic = async (id, teacherId) => {
  try {
    const topic = await findTopicById(id)
    if (!topic._id) return topic
    const teacher = await teacherModel.findTeacherById(teacherId)
    if (!teacher._id) return teacher
    const student = await GET_DB().collection(studentModel.STUDENT_COLLECTION).findOne(
      { topicId: new ObjectId(id) })
    if (student.teacherId.toString() !== teacher._id.toString())
      return { message: 'Sinh viên không thuộc quản lý' }
    if (topic.process !== 0) return { message: 'Đề tài đang thực hiện' }
    const students = await GET_DB().collection(studentModel.STUDENT_COLLECTION).find(
      { topicId: new ObjectId(id) }).toArray()
    const bulkOps = students.map(student => ({
      updateOne: {
        filter: { _id: new ObjectId(student._id) },
        update: { $set: { topicId: null } }
      }
    }))
    await GET_DB().collection(studentModel.STUDENT_COLLECTION).bulkWrite(bulkOps)
    const result = await GET_DB().collection(TOPIC_COLLECTION).deleteOne({ _id: new ObjectId(id) })
    return { ...result, message: 'Xóa đề tài thành công' }
  }
  catch (error) {
    throw error
  }
}
const removeStudent = async (topicId, studentId, teacherId) => {
  try {
    const student = await studentModel.findStudentById(studentId)
    if (!student._id) return student
    const topic = await topicModel.findTopicById(topicId)
    if (!topic._id) return topic
    const students = await GET_DB().collection(studentModel.STUDENT_COLLECTION).aggregate([
      { $match: { topicId: new ObjectId(topicId) } }
    ]).toArray()
    if (students.length === 1) return { message: 'Đề tài phải có ít nhất 1 thành viên' }
    const teacher = await teacherModel.findTeacherById(teacherId)
    if (!teacher._id) return teacher
    if (student.teacherId.toString() !== teacher._id.toString())
      return { message: 'Sinh viên không thuộc quản lý' }
    if (student.topicId.toString() !== topic._id.toString())
      return { message: 'Sinh viên không thuộc đề tài' }
    const result = await GET_DB().collection(studentModel.STUDENT_COLLECTION).updateOne(
      { _id: new ObjectId(studentId) },
      {
        $set: {
          topicId: null
        }
      }
    )
    if (result.modifiedCount > 0) {
      await GET_DB().collection(studentModel.STUDENT_COLLECTION).updateOne(
        { topicId: new ObjectId(topicId) },
        {
          $set: {
            updatedAt: Date.now()
          }
        }
      )
    }
    return { ...result, message: 'Xóa sinh viên khỏi đề tài thành công' }
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
  updateTopic,
  deleteTopic,
  removeStudent
}