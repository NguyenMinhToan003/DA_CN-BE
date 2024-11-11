import { StatusCodes } from 'http-status-codes'
import { studentService } from '../services/studentService'

const student_teacher = async (req, res) => {
  try {
    const { name, description, tech, teacherId, _id } = req.body
    const data = {
      name,
      description,
      tech,
      teacherId,
      _id
    }
    const result = await studentService.student_teacher(data)
    if (result.modifiedCount !== 1) {
      return res.status(StatusCodes.BAD_REQUEST).json(result)
    }
    return res.status(StatusCodes.CREATED).json(result)
  }
  catch (error) {
    throw error
  }
}

export const studentController = {
  student_teacher
}
