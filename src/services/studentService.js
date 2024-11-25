import { studentModel } from '../models/StudentModel'

const student_topic = async (data) => {
  try {
    data.updatedAt = Date.now()
    return await studentModel.student_topic(data)
  }
  catch (error) {
    throw error
  }
}
const student_teacher = async (id, teacherId) => {
  try {

    const data = {
      teacherId,
      updatedAt: Date.now()
    }
    return await studentModel.student_teacher(id, data)
  }
  catch (error) {
    throw error
  }
}
const getStudentsByTeacherId = async (id, status, process) => {
  try {

    return await studentModel.getStudentsByTeacherId(id, status, process)
  }
  catch (error) {
    throw error
  }
}
const getStudent = async (id) => {
  try {

    return await studentModel.findStudentById(id)
  }
  catch (error) {
    throw error
  }
}
export const studentService = {
  student_topic,
  student_teacher,
  getStudent,
  getStudentsByTeacherId
}