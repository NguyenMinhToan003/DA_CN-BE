import Joi from 'joi'
import { MESSAGE_OBJECID, REGEX_OBJECTID } from '../utils/regexs'
import { GET_DB } from '../configs/mongodb'
import { room_userModel } from './room_userModel'
import { ObjectId } from 'mongodb'

const ROOM_COLLECTION = 'rooms'
const roomSchema = Joi.object({
  _id: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID),
  name: Joi.string().required(),
  description: Joi.string().required(),
  teacherId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(Date.now())
})
const createRoom = async (name, description, teacherId) => {
  try {
    const room = await roomSchema.validateAsync({ name, description, teacherId }, { abortEarly: false })
    return await GET_DB().collection(ROOM_COLLECTION).insertOne({
      ...room,
      teacherId: new ObjectId(teacherId)
    })
  }
  catch (error) {
    throw error
  }
}
const findRoomById = async (roomId) => {
  try {
    const room = await GET_DB().collection(ROOM_COLLECTION).findOne({
      _id: new ObjectId(roomId)
    })
    const user = await room_userModel.findMenberByRoomId(roomId)
    room.members = user
    return room
  }
  catch (error) {
    throw error
  }
}

const deleteRoom = async (roomId) => {
  try {
    await room_userModel.removeAllMemberInRoom(roomId)
    return await GET_DB().collection(ROOM_COLLECTION).deleteOne({
      _id: new ObjectId(roomId)
    })
  }
  catch (error) {
    throw error
  }
}

export const roomModel = {
  ROOM_COLLECTION,
  roomSchema,
  createRoom,
  findRoomById,
  deleteRoom
}