import Joi from 'joi'

const LOAIDOAN_SCHEMA = Joi.object({
  tenLoaiDoan: Joi.string().required().min(3).max(30),
  moTa: Joi.string().required().min(5).max(255),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required()
})

export const loaiDoanModel = {
  LOAIDOAN_SCHEMA
}