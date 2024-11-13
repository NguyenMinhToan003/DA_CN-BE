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
export const teacherService = {
  getTeachers
}