import Joi from 'joi'
import bcrypt from 'bcrypt'
import { GET_DB } from '../configs/mongodb'

import { ObjectId } from 'mongodb'
import { MESSAGE_OBJECID, REGEX_OBJECTID } from '../utils/regexs'
import { studentModel } from './StudentModel'
const TEACHER_COLLECTION = 'teachers'

const teacherSchema = Joi.object({
  _id: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID),
  name: Joi.string().required(),
  profile_pic: Joi.string().default(''),
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
    const user = await GET_DB().collection(TEACHER_COLLECTION).findOne({ email })
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
    data = await teacherSchema.validateAsync(data, { abortEarly: false })
    let user
    user = await GET_DB().collection(TEACHER_COLLECTION).findOne(
      { email: data.email }
    )
    if (user) {
      return null
    }
    user = await GET_DB().collection(TEACHER_COLLECTION).insertOne(data)
    return user
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
const checkStudentBeforeConfirm = async (studentId) => {
  try {
    const student = await studentModel.findStudentById(studentId)
    if (!student) {
      return { message: 'Sinh viên không tồn tại' }
    }
    if (student.status === 1) {
      return { message: 'Sinh viên đã xác nhận' }
    }
    return { _id: student._id }
  }
  catch (error) {
    throw error
  }
}

const confirmStudents = async (teacherId, studentIds) => {
  try {
    const teacher = await findTeacherById(teacherId)
    if (!teacher) return null
    const students = []
    for (const studentId of studentIds) {
      const student = await checkStudentBeforeConfirm(studentId)
      if (student) {
        students.push(new ObjectId(student._id))
      }
    }
    students.filter(student => {
      if (student.toString() !== teacher._id.toString())
        return student
    })

    const result = await GET_DB().collection(studentModel.STUDENT_COLLECTION).updateMany(
      { _id: { $in: students } },
      {
        $set: {
          status: 1,
          updatedAt: Date.now(),
          teacherId: new ObjectId(teacher._id)
        }
      })
    return result
  }
  catch (error) {
    throw error
  }
}
const findTeacherById = async (id) => {
  try {
    const teacher = await GET_DB().collection(TEACHER_COLLECTION).findOne(
      { _id: new ObjectId(id) },
      { projection: NOSUBMITFIELD }
    )
    if (!teacher) {
      return null
    }
    return teacher
  }
  catch (error) {
    throw error
  }
}



export const teacherModel = {
  TEACHER_COLLECTION,
  NOSUBMITFIELD,
  teacherSchema,
  login,
  register,
  getTeachers,
  confirmStudents,
  findTeacherById
}