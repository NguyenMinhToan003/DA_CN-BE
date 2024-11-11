import { authService } from '../services/authService'
import { StatusCodes } from 'http-status-codes'
const login = async (req, res) => {
  try {
    const { email, password, user } = req.body
    const result = await authService.login(email, password, user)
    if (!result._id) {
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
  login,
  registerWithStudent,
  registerWithTeacher
}