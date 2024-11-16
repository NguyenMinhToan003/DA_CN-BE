import { teacherModel } from '../models/teacherModel'

const getTeachers = async () => {
  try {
    const result = teacherModel.getTeachers()
    return result
  }
  catch (error) {
    throw error
  }
}
const confirmStudents = async (id, studentIds) => {
  try {
    return await teacherModel.confirmStudents(id, studentIds)
  }
  catch (error) {
    throw error
  }
}
export const teacherService = {
  getTeachers,
  confirmStudents
}