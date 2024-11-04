import Joi from 'joi'
const TEACHER_COLLECTION = 'teachers'
const teacherSchema = Joi.object({
  name: Joi.string().required(),
  profile_pic: Joi.string().required(),
  email: Joi.string().required()
})

export const teacherModel = {
  TEACHER_COLLECTION,
  teacherSchema
}