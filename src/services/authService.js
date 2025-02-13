
import { studentModel } from '../models/StudentModel'
import { teacherModel } from '../models/teacherModel'
import bcrypt from 'bcrypt'
const saltRounds = 10
const hashpassword = async (password) => {
  return await bcrypt.hash(password, saltRounds)
}

const loginStudent = async (email, password) => {
  try {
    let user = await studentModel.login(email, password)
    if (!user._id) return {
      message: user.message
    }
    return {
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profile_pic: user.profile_pic,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      message: 'Đăng nhập thành công'
    }
  }
  catch (error) {
    throw error
  }
}

const loginTeacher = async (email, password) => {
  try {
    let user = await teacherModel.login(email, password)
    if (!user._id) return {
      message: user.message
    }
    return {
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profile_pic: user.profile_pic,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      message: 'Đăng nhập thành công'
    }
  }
  catch (error) {
    throw error
  }
}

const registerWithStudent = async (data) => {
  try {
    data = {
      ...data,
      password: await hashpassword(data.password)
    }
    const user = await studentModel.register(data)
    if (user === null) {
      return { message: 'Email đã tồn tại' }
    }
    return {
      ...user,
      message: 'Đăng kí thành công'
    }
  }
  catch (error) {
    throw error
  }
}
const registerWithTeacher = async (data) => {
  try {
    data = {
      ...data,
      password: await hashpassword(data.password)
    }
    const user = await teacherModel.register(data)
    if (user === null) {
      return { message: 'Email đã tồn tại' }
    }
    return {
      ...user,
      message: 'Đăng kí thành công'
    }
  }
  catch (error) {
    throw error
  }
}
export const authService = {
  loginStudent,
  loginTeacher,
  registerWithStudent,
  registerWithTeacher

}