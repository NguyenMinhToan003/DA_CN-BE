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
    const result = await studentModel.getAll(+page, +limit)
    return {
      ...result,
      message: 'Danh sách sinh viên'
    }
  }
  catch (error) {
    throw error
  }
}

const searchStudent = async (key, type, page, limit) => {
  try {
    const typeVi = {
      name: 'trường Tên',
      email: 'trường Email',
      studentCode: 'trường Mã sinh viên',
      CLASS: 'trường Lớp',
      status: 'trường Trạng thái',
      all: 'Tất cả trường'
    }
    let result = {}
    if (type === 'all') {
      result = await studentModel.getAll(+page, +limit)
    }
    else {
      result = await studentModel.search(key, type, +page, +limit)
    }
    return {
      ...result,
      message: `Tìm kiếm sinh viên theo ${typeVi[type]}`
    }
  }
  catch (error) {
    throw error
  }
}

export const studentService = {
  studentRegisterTopic,
  studentRegisterTeacher,
  getStudentDetail,
  getAllStudent,
  searchStudent
}