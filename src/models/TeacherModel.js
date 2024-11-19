import Joi from 'joi'
import bcrypt from 'bcrypt'
import { GET_DB } from '../configs/mongodb'
import { studentModel } from './StudentModel'
import { ObjectId } from 'mongodb'
import { MESSAGE_OBJECID, REGEX_OBJECTID } from '../utils/regexs'
const TEACHER_COLLECTION = 'teachers'
const teacherSchema = Joi.object({
  _id: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID),
  name: Joi.string().required(),
  profile_pic: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
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
    const user = await GET_DB().collection(TEACHER_COLLECTION).findOne({
      email
    })
    if (!user) {
      return 'Đăng nhập không thành công'
    }
    const isPasswordMatch = await comparePassword(password, user.password)
    if (!isPasswordMatch) {
      return 'Đăng nhập không thành công'
    }
    return user
  }
  catch (error) {
    throw error
  }
}
const register = async (data) => {
  try {
    data = await teacherSchema.validateAsync(data, { abortEarly: false })
    let user
    user = await GET_DB().collection(TEACHER_COLLECTION).findOne({ email: data.email })
    if (user) {
      return { message: 'Email đã tồn tại' }
    }
    user = await GET_DB().collection(TEACHER_COLLECTION).insertOne(data)
    return { ...user, message: 'Giáo viên đăng kí thành công' }
  }
  catch (error) {
    throw error
  }
}
const getTeachers = async () => {
  try {
    return await GET_DB().collection(TEACHER_COLLECTION).find(
      {},
      { projection: NOSUBMITFIELD }
    ).toArray()
  }
  catch (error) {
    throw error
  }
}
const confirmStudents = async (id, studentIds) => {
  try {
    const teacher = await GET_DB().collection(TEACHER_COLLECTION).findOne({ _id: new ObjectId(id) })
    if (!teacher) return { message: 'Giáo viên không tồn tại' }
    const result = await GET_DB().collection(studentModel.STUDENT_COLLECTION).updateMany(
      { _id: { $in: studentIds.map(id => new ObjectId(id)) } },
      {
        $set: {
          status: 1
        }
      }
    )
    if (result.modifiedCount > 0) {
      await GET_DB().collection(studentModel.STUDENT_COLLECTION).updateMany(
        { _id: { $in: studentIds.map(id => new ObjectId(id)) } },
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
    throw error
  }
}
export const teacherModel = {
  TEACHER_COLLECTION,
  teacherSchema,
  login,
  register,
  getTeachers,
  confirmStudents
}