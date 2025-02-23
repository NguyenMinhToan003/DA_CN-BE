import { room_userModel } from '../models/room_userModel'
import { roomModel } from '../models/roomModel'
import { studentModel } from '../models/StudentModel'
import { teacherModel } from '../models/teacherModel'

const createRoom = async (name, description, teacherId) => {
  try {
    const teacher = await teacherModel.findTeacherById(teacherId)
    if (!teacher) {
      return { message: 'Giáo viên không hợp lệ' }
    }
    const room = await roomModel.createRoom(name, description, teacherId)
    await room_userModel.joinMemberToRoom(room.insertedId.toString(), teacherId, 'teacher')
    return {
      ...room,
      message: 'Nhóm chat đã được tạo'
    }
  }
  catch (error) {
    throw error
  }
}

const getRoom = async (roomId, userId) => {
  try {
    let user = await teacherModel.findTeacherById(userId)
    if (!user) {
      user = await studentModel.findStudentById(userId)
    }
    if (!user) {
      return { message: 'Người dùng không hợp lệ' }
    }

    const result = await roomModel.findRoomById(roomId, userId)
    return {
      ...result,
      message: 'Thông tin nhóm chat'
    }
  }
  catch (error) {
    throw error
  }
}

const joinRoom = async (roomId, teacherId, members, role ) => {
  try {
    let joinRoomMember = 0
    const teacher = await teacherModel.findTeacherById(teacherId)
    if (!teacher) {
      return { message: 'Giáo viên không hợp lệ' }
    }
    const ds = await studentModel.findStudentsByIds(members)
    if (members.lenght!==ds.lenght) {
      return { message: 'Sinh viên không hợp lệ' }
    }

    for (let i = 0; i < members.length; i++) {
      const member = members[i]
      const exist = await room_userModel.existMemberInRoom(roomId, member)
      if (!exist) {
        await room_userModel.joinMemberToRoom(roomId, member, 'student')
        joinRoomMember++
      }
    }

    return {
      message: 'Tham gia nhóm',
      countMember: joinRoomMember
    }
  }
  catch (error) {
    throw error
  }
}

const deleteRoom = async (roomId, teacherId) => {
  try {
    const teacher = await teacherModel.findTeacherById(teacherId)
    if (!teacher) {
      return { message: 'giáo viên không hợp lệ ' }
    }
    const checkRole = await room_userModel.checkRoleMember(roomId, teacherId)
    console.log(checkRole)
    if (checkRole !== 'teacher') {
      return { message: 'Không có quyền xóa nhóm' }
    }
    const result = await roomModel.deleteRoom(roomId)
    return {
      ...result,
      message: 'Xóa nhóm thành công'
    }
  }
  catch (error) {
    throw error
  }
}

export const roomService = {
  createRoom,
  getRoom,
  joinRoom,
  deleteRoom
}