import { studentModel } from '../models/studentModel'
import { teacherModel } from '../models/teacherModel'
import bcrypt from 'bcrypt'
const saltRounds = 10
const hashpassword = async (password) => {
  return await bcrypt.hash(password, saltRounds)
}
const login = async (email, password, user) => {
  try {
    let result = null
    if (user === 'teacher') {
      result = await teacherModel.login(email, password)
    }
    else if (user == 'student') {
      result = await studentModel.login(email, password)
    }
    return result
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
    return await studentModel.register(data)
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
    return await teacherModel.register(data)
  }
  catch (error) {
    throw error
  }
}
export const authService = {
  login,
  registerWithStudent,
  registerWithTeacher

}