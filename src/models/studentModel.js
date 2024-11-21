import Joi from 'joi'
import { GET_DB } from '../configs/mongodb'
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'
import { REGEX_OBJECTID, MESSAGE_OBJECID } from '../utils/regexs'
import { teacherModel } from './teacherModel'
import { topicModel } from './TopicModel'
const STUDENT_COLLECTION = 'students'
const studentSchema = Joi.object({
  _id: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID),
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  profile_pic: Joi.string().required(),
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
    const user = await GET_DB().collection(STUDENT_COLLECTION).findOne(
      { email }
    )
    if (!user) {
      return { message: 'Tài khoản không hợp lệ' }
    }
    const isPasswordMatch = await comparePassword(password, user.password)
    if (!isPasswordMatch) {
      return { message: 'Tài khoản không hợp lệ' }
    }
    delete user.password
    return { ...user, message: 'Đăng nhập thành công' }
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
      return { message: 'Email đã tồn tại' }
    }
    user = await GET_DB().collection(STUDENT_COLLECTION).insertOne(data)
    delete user.password
    return { ...user, message: 'Sinh Viên đăng kí thành công' }
  }
  catch (error) {
    throw error
  }
}
const student_teacher = async (id, data) => {
  try {
    const user = await GET_DB().collection(STUDENT_COLLECTION).findOne(
      { _id: new ObjectId(id) }
    )
    if (!user) {
      return { message: 'Sinh viên không tồn tại' }
    }
    if (user.status === 1) {
      return { message: 'Giáo viên đã xác nhận' }
    }
    const teacher = await GET_DB().collection(teacherModel.TEACHER_COLLECTION).findOne(
      { _id: new ObjectId(data.teacherId) }
    )
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
    return { ...result, message: 'Chọn giáo viên thành công' }
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
      return { message: 'Sinh viên không tồn tại' }
    }
    return student
  }
  catch (error) {
    throw error
  }
}
const getStudentsByTeacherId = async (id) => {
  try {
    const students = await GET_DB().collection(STUDENT_COLLECTION).aggregate([
      {
        $match: {
          teacherId: new ObjectId(id)
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
      {
        $project: NOSUBMITFIELD
      }
    ]).toArray()
    return students
  } catch (error) {
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
  student_teacher,
  getStudentsByTeacherId
}