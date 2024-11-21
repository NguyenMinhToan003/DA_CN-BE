import { topicModel } from '../models/TopicModel'

const createTopic = async (data) => {
  // da tao va join topic sinh vien vao topic
  try {
    const dataTopic = {
      name: data.name,
      description: data.description,
      tech: data.tech
    }

    const topic = await topicModel.create(data.studentId, dataTopic)
    return { ...topic }
  }
  catch (error) {
    throw error
  }
}
const joinTopic = async (topicId, studentIds) => {
  try {
    return await topicModel.student_topic(topicId, studentIds)
  }
  catch (error) {
    throw error
  }
}
const getTopicById = async (id) => {
  try {
    return await topicModel.findTopicById(id)
  }
  catch (error) {
    throw error
  }
}
const getTopicByTeacherId = async (id) => {
  try {
    return await topicModel.findTopicByTeacherId(id)
  }
  catch (error) {
    throw error
  }
}
const confirmTopic = async (teacherId, topicId) => {
  try {
    return await topicModel.confirmTopic(teacherId, topicId)
  }
  catch (error) {
    throw error
  }
}
const createEmptyTopic = async (teacherId, studentId) => {
  try {
    return await topicModel.createEmptyTopic(teacherId, studentId)
  }
  catch (error) {
    throw error
  }
}
const getDetailTopicById = async (id) => {
  try {
    return await topicModel.getDetailTopicById(id)
  }
  catch (error) {
    throw error
  }
}
const updateTopic = async (teacherId, topicId, data) => {
  try {

    return await topicModel.updateTopic(teacherId, topicId, data)
  }
  catch (error) {
    throw error
  }
}
const deleteTopic = async (id, teacherId) => {
  try {
    return await topicModel.deleteTopic(id, teacherId)
  }
  catch (error) {
    throw error
  }
}
const removeStudent = async (topicId, studentId, teacherId) => {
  try {
    return await topicModel.removeStudent(topicId, studentId, teacherId)
  }
  catch (error) {
    throw error
  }
}
export const topicService = {
  createTopic,
  joinTopic,
  getTopicById,
  getTopicByTeacherId,
  confirmTopic,
  createEmptyTopic,
  getDetailTopicById,
  updateTopic,
  deleteTopic,
  removeStudent
}