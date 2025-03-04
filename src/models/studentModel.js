import Joi from 'joi'
import { GET_DB } from '../configs/mongodb'
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'
import { REGEX_OBJECTID, MESSAGE_OBJECID } from '../utils/regexs'
import { teacherModel } from './teacherModel'
import { topicModel } from './topicModel'
const STUDENT_COLLECTION = 'students'
const studentSchema = Joi.object({
  _id: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID),
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  profile_pic: Joi.string().default(''),
  studentCode: Joi.string().required(),
  CLASS: Joi.string().required(),
  teacherId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).default(null),
  topicId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).default(null),
  status: Joi.number().default(0),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(Date.now())
})
const NOSUBMITFIELD = {
  password: 0
}
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash)
}
const login = async (email, password) => {
  try {
    const user = await GET_DB().collection(STUDENT_COLLECTION).findOne({ email })
    if (!user) {
      return { message: 'Đăng nhập không thành công' }
    }
    const isPasswordMatch = await comparePassword(password, user.password)
    if (!isPasswordMatch) {
      return { message: 'Đăng nhập không thành công' }
    }
    return user
  }
  catch (error) {
    throw error
  }
}
const register = async (data) => {
  try {
    data = await studentSchema.validateAsync(data, { abortEarly: false })

    let user
    user = await GET_DB().collection(STUDENT_COLLECTION).findOne(
      { email: data.email },
      { project: NOSUBMITFIELD }
    )
    if (user) {
      return null
    }
    user = await GET_DB().collection(STUDENT_COLLECTION).insertOne(data)
    return user
  }
  catch (error) {
    throw error
  }
}
const studentRegisterTeacher = async (id, data) => {
  try {
    const user = await findStudentById(id)
    if (!user) {
      return { message: 'Sinh viên không tồn tại' }
    }
    if (user.status === 1) {
      return { message: 'Đã được giáo viên xác nhận' }
    }
    const teacher = await teacherModel.findTeacherById(data.teacherId)
    // const teacher = await GET_DB().collection(teacherModel.TEACHER_COLLECTION).findOne(
    //   { _id: new ObjectId(data.teacherId) }
    // )
    if (!teacher) {
      return { message: 'Giáo viên không tồn tại' }
    }

    const result = await GET_DB().collection(STUDENT_COLLECTION).updateOne(
      { _id: user._id },
      {
        $set: {
          teacherId: new ObjectId(data.teacherId),
          updatedAt: data.updatedAt
        }
      }
    )
    return { ...result, message: 'Chọn giáo viên thành công, Hãy chờ phản hồi từ giáo viên!' }
  }
  catch (error) {
    throw error
  }
}
const findStudentById = async (id) => {
  try {
    const student = await GET_DB().collection(STUDENT_COLLECTION).findOne(
      { _id: new ObjectId(id) },
      { projection: NOSUBMITFIELD }
    )
    if (!student) {
      return null
    }
    if (student?.teacherId) {
      const teacher = await teacherModel.findTeacherById(student?.teacherId)
      student.teacher = teacher
    }
    if (student?.topicId) {
      const topic = await topicModel.findTopicById(student?.topicId)
      student.topic = topic
    }
    return student
  }
  catch (error) {
    throw error
  }
}
const findStudentsByIds = async (ids) => {
  try {
    const students = await GET_DB().collection(STUDENT_COLLECTION).find(
      { _id: { $in: ids.map(id => new ObjectId(id)) } },
      { projection: NOSUBMITFIELD }
    ).toArray()
    return students
  }
  catch (error) {
    throw error
  }
}

const getStudentsByTeacherId = async (id, type, key, page, limit) => {
  try {
    const students = await GET_DB().collection(STUDENT_COLLECTION).aggregate([
      {
        $match: {
          teacherId: new ObjectId(id),
          $and: [
            type === 'all' ? {} : { [type]: { $regex: key, $options: 'i' } }
          ]
        }
      },
      {
        $lookup: {
          from: topicModel.TOPIC_COLLECTION,
          localField: 'topicId',
          foreignField: '_id',
          as: 'topic'
        }
      },
      { $project: NOSUBMITFIELD },
      { $skip: (page - 1) * limit },
      { $limit: limit }
    ]).toArray()
    const total = Math.ceil(
      await GET_DB().collection(STUDENT_COLLECTION).countDocuments({ teacherId: new ObjectId(id) })
    )
    const totalPage = Math.ceil(total / limit)
    return {
      students,
      total,
      totalPage
    }
  } catch (error) {
    throw error
  }
}

const getStudentsByTeacherKey = async (key, teacherId, topic) => {
  try {
    topic = parseInt(topic)
    const filter = {
      teacherId: new ObjectId(teacherId)
    }
    if (key !== undefined && key !== null && key !== '') {
      filter.$or = [
        { name: { $regex: key, $options: 'i' } },
        { studentCode: { $regex: key, $options: 'i' } }
      ]
    }
    if (topic === 1 || topic === 0) {
      filter.topicId = topic === 1 ? { $ne: null } : null
    }

    const students = await GET_DB().collection(STUDENT_COLLECTION).aggregate([
      { $match: filter },
      {
        $lookup: {
          from: topicModel.TOPIC_COLLECTION,
          localField: 'topicId',
          foreignField: '_id',
          as: 'topic'
        }
      },
      {
        $project: NOSUBMITFIELD
      }
    ]).toArray()
    return students
  }
  catch (error) {
    throw error
  }
}

const getStudentsByTopicId = async (topicId) => {
  try {
    const students = await GET_DB().collection(STUDENT_COLLECTION).find(
      { topicId: new ObjectId(topicId) },
      { projection: NOSUBMITFIELD }
    ).toArray()
    return students
  }
  catch (error) {
    throw error
  }
}

const getAll = async(page, limit) => {
  try {
    const students = await GET_DB().collection(STUDENT_COLLECTION).aggregate([
      { $skip: (page - 1) * limit },
      { $limit: limit }
    ]).toArray()

    const total = await GET_DB().collection(STUDENT_COLLECTION).countDocuments()
    const totalPage = Math.ceil(total / limit)

    return {
      students,
      total,
      totalPage
    }
  }
  catch (error) {
    throw error
  }
}

const search = async (key, type, page, limit) => {
  try {
    const students = await GET_DB().collection(STUDENT_COLLECTION).find(
      {
        [type]: { $regex: key, $options: 'i' }
      },
      { projection: NOSUBMITFIELD }
    ).toArray()
    const total = students.length
    const totalPage = Math.ceil(total / limit)
    const result = students.slice((page - 1) * limit, page * limit)
    return {
      students: result,
      total,
      totalPage
    }
  }
  catch (error) {
    throw error
  }
}

export const studentModel = {
  STUDENT_COLLECTION,
  NOSUBMITFIELD,
  studentSchema,
  login,
  register,
  findStudentById,
  findStudentsByIds,
  studentRegisterTeacher,
  getStudentsByTeacherId,
  getStudentsByTeacherKey,
  getStudentsByTopicId,
  getAll,
  search
}