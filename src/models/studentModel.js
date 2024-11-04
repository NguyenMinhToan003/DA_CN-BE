import Joi from 'joi'
const STUDENT_COLLECTION = 'students'
const studentSchema = Joi.object({
  name: Joi.string().required(),
  profile_pic: Joi.string().required(),
  studentCode: Joi.string().required(),
  class: Joi.string().required()
})


export const studentModel = {
  STUDENT_COLLECTION,
  studentSchema
}