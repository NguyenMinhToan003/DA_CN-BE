import { StatusCodes } from 'http-status-codes'
import { roomService } from '../services/roomService'

const createRoom = async (req, res) => {
  try {
    const { name, description, teacherId } = req.body
    const result = await roomService.createRoom(name, description, teacherId)
    if (result?.insertedId) {
      return res.status(StatusCodes.CREATED).json(result)
    }
    return res.status(StatusCodes.BAD_REQUEST).json(result)
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}

const getRoom = async (req, res) => {
  try {
    const { roomId, userId } = req.body
    const result = await roomService.getRoom(roomId, userId)
    if (result) {
      return res.status(StatusCodes.OK).json(result)
    }
    return res.status(StatusCodes.BAD_REQUEST).json(result)
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}
const joinRoom = async (req, res) => {
  try {
    const { roomId, teacherId, members, role } = req.body
    const result = await roomService.joinRoom(roomId, teacherId, members, role)
    if (result) {
      return res.status(StatusCodes.OK).json(result)
    }
    return res.status(StatusCodes.BAD_REQUEST).json(result)
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}
const deleteRoom = async (req, res) => {
  try {
    const { roomId, teacherId } = req.body
    const result = await roomService.deleteRoom(roomId, teacherId)
    if (result?.deletedCount > 0) {
      return res.status(StatusCodes.OK).json(result)
    }
    return res.status(StatusCodes.BAD_REQUEST).json(result)
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}

export const roomController = {
  createRoom,
  getRoom,
  joinRoom,
  deleteRoom
}