import { StatusCodes } from 'http-status-codes'
import { studentService } from '../services/studentService'

const studentRegisterTopic = async (req, res) => {
  try {
    const { name, description, tech, id } = req.body
    const data = {
      name,
      description,
      tech
    }
    const result = await studentService.studentRegisterTopic(id, { ...data } )
    if (!result?.insertedId) {
      return res.status(StatusCodes.BAD_REQUEST).json(result)
    }
    return res.status(StatusCodes.CREATED).json(result)
  }
  catch (error) {
    throw error
  }
}
const studentRegisterTeacher = async (req, res) => {
  try {
    const { teacherId, studentId } = req.body
    const result = await studentService.studentRegisterTeacher(studentId, teacherId)
    if (result?.modifiedCount !== 1) {
      return res.status(StatusCodes.BAD_REQUEST).json(result)
    }
    return res.status(StatusCodes.CREATED).json(result)
  }
  catch (error) {
    throw error
  }
}

const getStudentDetail = async (req, res) => {
  try {
    const { id } = req.body
    const result = await studentService.getStudentDetail(id)
    return res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    throw error
  }
}

const getAllStudent = async (req, res) => {
  try {
    const { page, limit } = req.query
    const result = await studentService.getAllStudent(page, limit)
    return res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    throw error
  }
}

export const studentController = {
  studentRegisterTopic,
  studentRegisterTeacher,
  getStudentDetail,
  getAllStudent
}
