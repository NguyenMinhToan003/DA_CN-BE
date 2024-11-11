import express from 'express'
import { topicValidation } from '../../validations/topicValidation'
import { topicController } from '../../controllers/topicController'
const Router = express.Router()

Router.route('/create')
  .get(topicValidation.createTopic, topicController.createTopic)
Router.route('/join-topic')
  .get(topicValidation.joinTopic, topicController.joinTopic)

export const topicRoute = Router