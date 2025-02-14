import { studentModel } from '../models/StudentModel'
import { topicModel } from '../models/topicModel'

const studentRegisterTopic = async (id, data) => {
  try {
    data.updatedAt = Date.now()
    return await topicModel.createByStudent(id, data)
  }
  catch (error) {
    throw error
  }
}
const studentRegisterTeacher = async (studentId, teacherId) => {
  try {
    const data = {
      teacherId,
      updatedAt: Date.now()
    }
    return await studentModel.studentRegisterTeacher(studentId, data)
  }
  catch (error) {
    throw error
  }
}

const getStudentDetail = async (id) => {
  try {
    const student = await studentModel.findStudentById(id)
    if (!student) {
      return { message: 'Sinh viên không tồn tại' }
    }
    return student
  }
  catch (error) {
    throw error
  }
}

const getAllStudent = async (page, limit) => {
  try {
    console.log('page', page, 'limit', limit)
    return await studentModel.getAll(+page, +limit)
  }
  catch (error) {
    throw error
  }
}

export const studentService = {
  studentRegisterTopic,
  studentRegisterTeacher,
  getStudentDetail,
  getAllStudent
}