import express from 'express'
import { notificationValidation } from '../../validations/notificationValidation'
import { notificationController } from '../../controllers/notificationController'
const Router = express.Router()

Router.route('/send-notification')
  .post(
    notificationValidation.sendNotification,
    notificationController.sendNotification
  )
Router.route('/ds-notification')
  .get(
    notificationValidation.getDsNotification,
    notificationController.getDsNotification
  )

export const notificationRoute = Router