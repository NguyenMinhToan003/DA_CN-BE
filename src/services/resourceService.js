import { uploadFilesToCloudinary } from '../configs/cloundinary'
import { removeFile } from '../middle/multer'
import { resourceModel } from '../models/resourceModel'
import { studentModel } from '../models/StudentModel'
import { teacherModel } from '../models/teacherModel'
import { topicModel } from '../models/topicModel'

const uploadResource = async (studentId, name, description, topicId, files) => {
  const student = await studentModel.findStudentById(studentId)
  let message = ''
  if (!student) message = 'Sinh viên không tồn tại'
  const topic = await topicModel.findTopicById(topicId)
  if (!topic) message = 'Đề tài không tồn tại'
  if (student.topicId.toString() !== topic._id.toString())
    message = 'Sinh viên không thuộc đề tài này'
  if (message) {
    files.forEach((file) => {
      removeFile(file.url)
    })
    return { message }
  }
  const uploadedFiles = await uploadFilesToCloudinary(files)
  const resourceData = {
    name,
    description,
    topicId,
    files: uploadedFiles
  }
  const resource = await resourceModel.create(resourceData)
  return {
    ...resource,
    message: 'Tải tài liệu thành công'
  }
}


const getDsResource = async (topicId, userId) => {
  try {
    let teacher = await teacherModel.findTeacherById(userId)
    if (!!teacher) {
      const students = await (await studentModel.getStudentsByTeacherId(userId, 'all', 'a', 1, 1000)).students
      if (students.some((student) => student.teacherId.toString() === teacher._id.toString())) {
        const resources = await resourceModel.getDsResource(topicId)
        return {
          resources,
          message: 'Lấy danh sách tài liệu thành công'
        }
      }
    }
    const student = await studentModel.findStudentById(userId)
    if (student) {
      if (student?.topicId?.toString() === topicId) {
        const resources = await resourceModel.getDsResource(topicId)
        return {
          resources,
          message: 'Lấy danh sách tài liệu thành công'
        }
      }
    }
    return { message: 'Không có quyền truy cập' }
  }
  catch (error) {
    throw error
  }
}

const deleteResource = async (resourceId, studentId) => {
  try {
    const student = await studentModel.findStudentById(studentId)
    if (!student) return { message: 'Sinh viên không tồn tại' }
    const resource = await resourceModel.findResourceById(resourceId)
    if (!resource) return { message: 'Tài liệu không tồn tại' }
    if (resource?.topicId.toString() !== student?.topicId.toString())
      return { message: 'Không có quyền xóa tài liệu' }
    const result = await resourceModel.deleteResource(resourceId)
    return { ...result, message: 'Xóa tài liệu thành công' }
  }
  catch (error) {
    throw error
  }
}

const editResource = async (resourceId, studentId, name, description, files) => {
  try {

    const student = await studentModel.findStudentById(studentId)
    if (!student) return { message: 'Sinh viên không tồn tại' }
    const resource = await resourceModel.findResourceById(resourceId)
    if (!resource) return { message: 'Tài liệu không tồn tại' }
    if (resource?.topicId.toString() !== student?.topicId.toString())
      return { message: 'Không có quyền sửa tài liệu' }

    const uploadedFiles = await uploadFilesToCloudinary(files) || []
    const resourceData = {
      name,
      description,
      files: uploadedFiles
    }
    const result = await resourceModel.editResource(resourceId, resourceData)
    return { ...result, message: 'Sửa tài liệu thành công' }
  }
  catch (error) {
    throw error
  }
}

export const resourceService = {
  uploadResource,
  getDsResource,
  deleteResource,
  editResource
}