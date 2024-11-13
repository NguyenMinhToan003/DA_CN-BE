import express from 'express'
import { topicValidation } from '../../validations/topicValidation'
import { topicController } from '../../controllers/topicController'
const Router = express.Router()

Router.route('/create')
  .post(topicValidation.createTopic, topicController.createTopic)
Router.route('/join-topic')
  .post(topicValidation.joinTopic, topicController.joinTopic)
Router.route('/detai?:id')
  .get(topicValidation.getTopicById, topicController.getTopicById)
export const topicRoute = Router