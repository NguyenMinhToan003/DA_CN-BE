import { studentModel } from '../models/StudentModel'

const student_teacher = async (data) => {
  try {
    data.updatedAt = new Date()
    return await studentModel.student_teacher(data)
  }
  catch (error) {
    throw error
  }
}
export const studentService = {
  student_teacher
}