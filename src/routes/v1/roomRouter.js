import express from 'express'
import { roomValidation } from '../../validations/roomValidation'
import { roomController } from '../../controllers/roomController'

const Router = express.Router()

Router.route('/create-room')
  .post(
    roomValidation.createRoom,
    roomController.createRoom)

Router.route('/get-room')
  .post(
    roomValidation.getRoom,
    roomController.getRoom)

Router.route('/join-room')
  .post(
    roomValidation.joinRoom,
    roomController.joinRoom)
Router.route('/delete-room')
  .post(
    roomValidation.deleteRoom,
    roomController.deleteRoom
  )

export const roomRouter = Router