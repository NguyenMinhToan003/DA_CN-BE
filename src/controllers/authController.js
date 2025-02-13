import { authService } from '../services/authService'
import { StatusCodes } from 'http-status-codes'
const loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await authService.loginTeacher(email, password)
    if (!result.data) {
      return res.status(StatusCodes.UNAUTHORIZED).json(result)
    }
    return res.status(StatusCodes.OK).json(result)

  } catch (error) {
    throw error
  }
}
const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await authService.loginStudent(email, password)
    if (!result.data) {
      return res.status(StatusCodes.UNAUTHORIZED).json(result)
    }
    return res.status(StatusCodes.OK).json(result)

  } catch (error) {
    throw error
  }
}
const registerWithStudent = async (req, res) => {
  try {
    const { name, email, password, profile_pic, studentCode, CLASS } = req.body
    const data = {
      name,
      email,
      password,
      profile_pic,
      studentCode,
      CLASS
    }
    const result = await authService.registerWithStudent(data)
    if (!result.insertedId) {
      return res.status(StatusCodes.BAD_REQUEST).json(result)
    }
    return res.status(StatusCodes.CREATED).json(result)
  }
  catch (error) {
    throw error
  }
}
const registerWithTeacher = async (req, res) => {
  try {
    const { name, email, password, profile_pic } = req.body
    const data = {
      name,
      email,
      password,
      profile_pic
    }
    const result = await authService.registerWithTeacher(data)
    if (!result.insertedId) {
      return res.status(StatusCodes.BAD_REQUEST).json(result)
    }
    return res.status(StatusCodes.CREATED).json(result)
  }
  catch (error) {
    throw error
  }
}
export const authController = {
  loginTeacher,
  loginStudent,
  registerWithStudent,
  registerWithTeacher
}