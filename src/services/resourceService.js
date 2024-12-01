import { resourceModel } from '../models/resourceModel'

const uploadResource = async (url, name, description, topicId, studentId) => {
  try {
    return await resourceModel.uploadResource(url, name, description, topicId, studentId)
  }
  catch (error) {
    throw error
  }
}
const getDsResource = async (topicId) => {
  try {
    return await resourceModel.getDsResource(topicId)
  }
  catch (error) {
    throw error
  }
}
export const resourceService = {
  uploadResource,
  getDsResource
}