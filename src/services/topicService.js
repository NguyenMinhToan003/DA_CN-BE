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
const confirmTopic = async (teacherId, ids) => {
  try {
    return await topicModel.confirmTopic(teacherId, ids)
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
  confirmTopic
}