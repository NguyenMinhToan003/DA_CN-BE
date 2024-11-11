import Joi from 'joi'
import { GET_DB } from '../configs/mongodb'
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'
import { REGEX_OBJECTID, MESSAGE_OBJECID } from '../utils/regexs'
import { teacherModel } from './teacherModel'
import { topicModel } from './TopicModel'
const STUDENT_COLLECTION = 'students'
const studentSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  profile_pic: Joi.string().required(),
  studentCode: Joi.string().required(),
  CLASS: Joi.string().required(),
  teacherId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).default(null),
  topicId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(Date.now())
})
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash)
}
const login = async (email, password) => {
  try {
    const user = await GET_DB().collection(STUDENT_COLLECTION).findOne({
      email
    })
    if (!user) {
      return { message: 'Tài khoản không hợp lệ' }
    }
    const isPasswordMatch = await comparePassword(password, user.password)
    if (!isPasswordMatch) {
      return { message: 'Tài khoản không hợp lệ' }
    }
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
    user = await GET_DB().collection(STUDENT_COLLECTION).findOne({ email: data.email })
    if (user) {
      return { message: 'Email đã tồn tại' }
    }
    user = await GET_DB().collection(STUDENT_COLLECTION).insertOne(data)
    return { ...user, message: 'Sinh Viên đăng kí thành công' }
  }
  catch (error) {
    throw error
  }
}
const student_teacher = async (data) => {
  try {
    const user = await GET_DB().collection(STUDENT_COLLECTION).findOne(
      { _id: new ObjectId(data._id) }
    )
    if (!user) {
      return { message: 'Sinh viên không tồn tại' }
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
      { _id: new ObjectId(id) }
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
const student_topic = async (id, data) => {
  try {

    const user = await GET_DB().collection(STUDENT_COLLECTION).findOne(
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

    const result = await GET_DB().collection(STUDENT_COLLECTION).updateOne(
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
export const studentModel = {
  STUDENT_COLLECTION,
  studentSchema,
  login,
  register,
  student_teacher,
  findStudentById,
  student_topic
}