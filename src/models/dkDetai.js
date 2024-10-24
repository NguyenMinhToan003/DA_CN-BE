import Joi from 'joi'
import { REGEX_OBJECTID, MESSAGE_OBJECID } from '../utils/regexs'

const DKDETAI_SCHEMA = Joi.object({
  user_id: Joi.string().required().regex(REGEX_OBJECTID).message(MESSAGE_OBJECID),
  deTai_id: Joi.string().required().regex(REGEX_OBJECTID).message(MESSAGE_OBJECID),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required()
})

const dkDetaiModel = {
  DKDETAI_SCHEMA
}