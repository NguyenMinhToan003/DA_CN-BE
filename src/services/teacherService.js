import { studentModel } from '../models/StudentModel'
import { teacherModel } from '../models/teacherModel'
import { topicModel } from '../models/topicModel'

const getTeachers = async () => {
  try {
    const result = teacherModel.getTeachers()
    return result
  }
  catch (error) {
    throw error
  }
}
const confirmStudents = async (teacherId, studentIds) => {
  try {
    const teacher = await teacherModel.confirmStudents(teacherId, studentIds)
    if (!teacher) return { message: 'Giáo viên không tồn tại' }
    return teacher
  }
  catch (error) {
    throw error
  }
}

const getStudentsByTeacherId = async (id, type, key, page, limit) => {
  try {
    return await studentModel.getStudentsByTeacherId(id, type, key, +page, +limit)
  }
  catch (error) {
    throw error
  }
}

const getStudentsByTeacherKey = async (key, teacherId, topic) => {
  try {
    return await studentModel.getStudentsByTeacherKey(key, teacherId, topic)
  }
  catch (error) {
    throw error
  }
}

const teacherCreateTopic = async (teacherId, studentIds, data) => {
  try {
    data.updatedAt = Date.now()
    const topic = await topicModel.createByTeacher(teacherId, studentIds, data)
    return topic
  }
  catch (error) {
    throw error
  }
}

export const teacherService = {
  getTeachers,
  confirmStudents,
  getStudentsByTeacherId,
  getStudentsByTeacherKey,
  teacherCreateTopic
}