import { teacherService } from '../services/teacherService.js'
import { StatusCodes } from 'http-status-codes'

const getTeachers = async (req, res) => {
  try {
    const result = await teacherService.getTeachers()
    return res.status(StatusCodes.OK).json(result)
  } catch (error) {
    throw error
  }
}
const confirmStudents = async (req, res) => {
  try {
    const { teacherId, studentIds } = req.body
    const result = await teacherService.confirmStudents(teacherId, studentIds)
    return res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    throw error
  }
}

const getStudentsByTeacherId = async (req, res) => {
  try {
    const { id, page, limit, type, key } = req.query

    const result = await teacherService.getStudentsByTeacherId(id, type, key, page, limit)
    return res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    throw error
  }
}
const getStudentsByTeacherKey = async (req, res) => {
  try {
    const { key, teacherId, topic } = req.query
    const result = await teacherService.getStudentsByTeacherKey(key, teacherId, topic)
    return res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    throw error
  }
}
const teacherCreateTopic = async (req, res) => {
  try {
    const { name, description, tech, teacherId, studentIds } = req.body
    const data = {
      name,
      description,
      tech
    }
    const result = await teacherService.teacherCreateTopic(teacherId, studentIds, { ...data } )
    if (!result?.insertedId) {
      return res.status(StatusCodes.BAD_REQUEST).json(result)
    }
    return res.status(StatusCodes.CREATED).json(result)
  }
  catch (error) {
    throw error
  }
}

export const teacherController = {
  getTeachers,
  confirmStudents,
  getStudentsByTeacherId,
  getStudentsByTeacherKey,
  teacherCreateTopic

}
