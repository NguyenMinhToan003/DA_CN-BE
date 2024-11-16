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
    const { id, studentIds } = req.body
    const result = await teacherService.confirmStudents(id, studentIds)
    return res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    throw error
  }
}
export const teacherController = {
  getTeachers,
  confirmStudents
}
