import { studentModel } from '../models/StudentModel'
import { topicModel } from '../models/TopicModel'

const createTopic = async (data) => {
  try {
    const dataTopic = {
      name: data.name,
      description: data.description,
      tech: data.tech
    }
    const dataStudentChange = {
      _id: data.studentId,
      topicId: null,
      updateAt: new Date()
    }
    const topic = await topicModel.create(dataStudentChange._id, dataTopic)
    //! them topicId vao dataStudent
    dataStudentChange.topicId = topic.insertedId
    const student = await studentModel.student_topic(dataStudentChange._id, dataStudentChange)
    return { ...topic, ...student }
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
      updateAt: new Date()
    }
    return await studentModel.student_topic(_id, data)

  }
  catch (error) {
    throw error
  }
}
export const topicService = {
  createTopic,
  joinTopic
}