import Joi from 'joi'
import bcrypt from 'bcrypt'
import { GET_DB } from '../configs/mongodb'
const TEACHER_COLLECTION = 'teachers'
const teacherSchema = Joi.object({
  name: Joi.string().required(),
  profile_pic: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(Date.now())
})
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
    return await GET_DB().collection(TEACHER_COLLECTION).find().toArray()
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
  getTeachers
}