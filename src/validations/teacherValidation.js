import Joi from 'joi'
import { REGEX_OBJECTID, MESSAGE_OBJECID } from '../utils/regexs'
import { StatusCodes } from 'http-status-codes'
const confirmStudents = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID).required(),
    studentIds: Joi.array().items(Joi.string().pattern(REGEX_OBJECTID).message(MESSAGE_OBJECID)).required()
  })
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error })
  }
}
export const teacherValidation = {
  confirmStudents
}