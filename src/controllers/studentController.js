import { StatusCodes } from 'http-status-codes'
import { studentService } from '../services/studentService'

const student_topic = async (req, res) => {
  try {
    const { name, description, tech, teacherId, _id } = req.body
    const data = {
      name,
      description,
      tech,
      teacherId,
      _id
    }
    const result = await studentService.student_topic(data)
    if (result.modifiedCount !== 1) {
      return res.status(StatusCodes.BAD_REQUEST).json(result)
    }
    return res.status(StatusCodes.CREATED).json(result)
  }
  catch (error) {
    throw error
  }
}
const student_teacher = async (req, res) => {
  try {
    const { teacherId, id } = req.query
    const result = await studentService.student_teacher(id, teacherId)
    if (result.modifiedCount !== 1) {
      return res.status(StatusCodes.BAD_REQUEST).json(result)
    }
    return res.status(StatusCodes.CREATED).json(result)
  }
  catch (error) {
    throw error
  }
}
const getStudentsByTeacherId = async (req, res) => {
  try {
    const { id, status, process } = req.query
    const result = await studentService.getStudentsByTeacherId(id, status, process)
    return res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    throw error
  }
}

export const studentController = {
  student_topic,
  student_teacher,
  getStudentsByTeacherId
}
