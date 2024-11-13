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
const joinTopic = async (data) => {
  try {
    const _id = data.studentId
    data = {
      topicId: data.topicId,
      updatedAt: Date.now()
    }
    return await topicModel.student_topic(_id, data)

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
export const topicService = {
  createTopic,
  joinTopic,
  getTopicById
}