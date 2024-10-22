import Joi from 'joi'
import { REGEX_OBJECTID, MESSAGE_OBJECID } from '../utils/regexs'

const NOTIFICATION_SCHEMA = Joi.object({
  sender_id: Joi.string().required().pattern(REGEX_OBJECTID).messages(MESSAGE_OBJECID),
  receiver_id: Joi.string().required().pattern(REGEX_OBJECTID).messages(MESSAGE_OBJECID),
  // loai thong bao: notify, message, request
  type: Joi.string().required().valid('notify', 'message', 'request'),
  message: Joi.string().required().min(1).max(255),
  // hanh dong khi nhan vao thong bao
  action: Joi.string().required().pattern(REGEX_OBJECTID).messages(MESSAGE_OBJECID),
  // trang thai cua thong bao khi nguoi dung xac nhan
  status: Joi.string().required().valid('accept', 'decline'),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required()
})

export const notificationModel = {
  NOTIFICATION_SCHEMA
}