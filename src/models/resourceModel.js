import Joi from 'joi'
import { REGEX_OBJECTID, MESSAGE_OBJECID } from '../utils/regexs.js'
import { GET_DB } from '../configs/mongodb.js'
import { ObjectId } from 'mongodb'
import { deleteFilesFromCloudinary } from '../configs/cloundinary.js'
const RESOURCE_COLLECTION = 'resources'

const resourceSchema = Joi.object({
  files: Joi.array().items(
    Joi.object({
      url: Joi.string().uri().required(),
      public_id: Joi.string().required()
    })
  ),
  name: Joi.string().required(),
  description: Joi.string().required(),
  topicId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(Date.now())
})
const create = async (resourceData) => {
  try {
    const { name, description, topicId, files } = resourceData
    const resource = await resourceSchema.validateAsync({ name, description, topicId, files })
    return await GET_DB().collection(RESOURCE_COLLECTION).insertOne({
      ...resource, topicId: new ObjectId(topicId)
    })

  }
  catch (error) {
    throw error
  }
}
const getDsResource = async (topicId) => {
  try {
    const resources = await GET_DB().collection(RESOURCE_COLLECTION).aggregate([
      { $match: { topicId: new ObjectId(topicId) } }
    ]).toArray()
    return resources
  }
  catch (error) {
    throw error
  }
}

const deleteResource = async (resourceId) => {
  try {
    const resource = await findResourceById(resourceId)
    const deleteResourceInCloudinary = await deleteFilesFromCloudinary(resource.files)
    if (deleteResourceInCloudinary?.ok > 0) {
      return await GET_DB().collection(RESOURCE_COLLECTION).deleteOne({ _id: new ObjectId(resourceId) })
    }
    else {
      return { message: 'Xóa tài liệu không thành công' }
    }
  }
  catch (error) {
    throw error
  }
}

const findResourceById = async (resourceId) => {
  try {
    return await GET_DB().collection(RESOURCE_COLLECTION).findOne({ _id: new ObjectId(resourceId) })
  }
  catch (error) {
    throw error
  }
}

const editResource = async (resourceId, resourceData) => {
  try {

    const resource = await findResourceById(resourceId)

    if (resourceData?.files.length > 0) {
      const deleteResourceInCloudinary = await deleteFilesFromCloudinary(resource.files)
      if (deleteResourceInCloudinary?.ok > 0) {
        const name = resourceData.name || resource.name
        const description = resourceData.description || resource.description
        const topicId = resourceData.topicId || resource.topicId.toString()
        const files = resourceData.files

        const updateResource = await resourceSchema.validateAsync({ name, description, topicId, files })
        return await GET_DB().collection(RESOURCE_COLLECTION).updateOne({ _id: new ObjectId(resourceId) }, {
          $set: { ...updateResource }
        })
      }
      else {
        return { message: 'Sửa tài liệu không thành công' }
      }
    }
    else {
      const name = resourceData.name || resource.name
      const description = resourceData.description || resource.description
      const topicId = resourceData.topicId || resource.topicId.toString()
      const updateResource = await resourceSchema.validateAsync({ name, description, topicId })
      return await GET_DB().collection(RESOURCE_COLLECTION).updateOne({ _id: new ObjectId(resourceId) }, {
        $set: { ...updateResource }
      })
    }
  }
  catch (error) {
    throw error
  }
}

export const resourceModel = {
  RESOURCE_COLLECTION,
  resourceSchema,
  getDsResource,
  create,
  deleteResource,
  findResourceById,
  editResource
}