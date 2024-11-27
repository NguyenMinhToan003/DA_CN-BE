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
    const { id, status, process, topic } = req.query
    const result = await studentService.getStudentsByTeacherId(id, status, process, topic)
    return res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    throw error
  }
}
const getStudent = async (req, res) => {
  try {
    const { id } = req.body
    const result = await studentService.getStudent(id)
    return res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    throw error
  }
}
const getStudentsByTeacherKey = async (req, res) => {
  try {
    const { key, teacherId, topic } = req.query
    const result = await studentService.getStudentsByTeacherKey(key, teacherId, topic)
    return res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    throw error
  }
}
export const studentController = {
  student_topic,
  student_teacher,
  getStudentsByTeacherId,
  getStudent,
  getStudentsByTeacherKey
}
