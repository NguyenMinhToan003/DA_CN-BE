import express from 'express'
import { topicValidation } from '../../validations/topicValidation'
import { topicController } from '../../controllers/topicController'
const Router = express.Router()

Router.route('/create')
  .post(topicValidation.createTopic, topicController.createTopic)
Router.route('/join-topic')
  .post(topicValidation.joinTopic, topicController.joinTopic)
Router.route('/detail?:id')
  .get(topicValidation.getTopicById, topicController.getTopicById)
Router.route('/suport-teacher/ds-de-tai?:id')
  .get(topicValidation.getTopicByTeacherId, topicController.getTopicByTeacherId)
Router.route('/suport-teacher/xac-nhan-topics')
  .post(topicValidation.confirmTopic, topicController.confirmTopic)
export const topicRoute = Router