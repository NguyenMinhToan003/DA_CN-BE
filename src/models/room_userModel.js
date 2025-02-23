import Joi, { exist } from 'joi'
import { MESSAGE_OBJECID, REGEX_OBJECTID } from '../utils/regexs'
import { GET_DB } from '../configs/mongodb'
import { ObjectId } from 'mongodb'
import { studentModel } from './StudentModel'
import { teacherModel } from './teacherModel'

const ROOM_USER_COLLECTION = 'room_users'
const room_userSchema = Joi.object({
  _id: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID),
  roomId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),
  userId: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),
  role: Joi.string().valid('teacher', 'student').required().default('student'),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(Date.now())
})

const joinMemberToRoom = async (roomId, userId, role) => {
  try {
    const room_user = await room_userSchema.validateAsync({
      roomId: roomId,
      userId: userId,
      role: role
    }, { abortEarly: false })
    return await GET_DB().collection(ROOM_USER_COLLECTION).insertOne({
      ...room_user,
      roomId: new ObjectId(roomId),
      userId: new ObjectId(userId)
    })
  }
  catch (error) {
    throw error
  }
}

const findMenberByRoomId = async (roomId) => {
  try {
    const members = await GET_DB().collection(ROOM_USER_COLLECTION).aggregate([
      { $match: { roomId: new ObjectId(roomId) } }
    ]).toArray()
    const students = []
    const teachers = []
    for (let i = 0; i < members.length; i++) {
      const member = members[i]
      if (member.role === 'student') {
        const student = await studentModel.findStudentById(member.userId)
        students.push(student)
      }
      else {
        const teacher = await teacherModel.findTeacherById(member.userId)
        teachers.push(teacher)
      }
    }
    return [...teachers, ...students]
  }
  catch (error) {
    throw error
  }
}

const existMemberInRoom = async (roomId, userId) => {
  try {
    const member = await GET_DB().collection(ROOM_USER_COLLECTION).findOne({
      roomId: new ObjectId(roomId),
      userId: new ObjectId(userId)
    })
    return member?._id ? true : false
  }
  catch (error) {
    throw error
  }
}

const removeAllMemberInRoom = async (id) => {
  try {
    const result = await GET_DB().collection(ROOM_USER_COLLECTION).deleteMany(
      { roomId: new ObjectId(id) }
    )
    return result
  }
  catch (error) {
    throw error
  }
}
const checkRoleMember = async (roomId, userId) => {
  try {
    const member = await GET_DB().collection(ROOM_USER_COLLECTION).findOne({
      roomId: new ObjectId(roomId),
      userId: new ObjectId(userId)
    })
    return member?.role
  }
  catch (error) {
    throw error
  }
}

export const room_userModel = {
  ROOM_USER_COLLECTION,
  findMenberByRoomId,
  joinMemberToRoom,
  existMemberInRoom,
  removeAllMemberInRoom,
  checkRoleMember

}