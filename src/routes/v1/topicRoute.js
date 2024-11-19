import express from 'express'
import { topicValidation } from '../../validations/topicValidation'
import { topicController } from '../../controllers/topicController'
const Router = express.Router()

Router.route('/create')
  .post(topicValidation.createTopic, topicController.createTopic)
Router.route('/join')
  .post(topicValidation.joinTopic, topicController.joinTopic)
Router.route('/info?:id')
  .get(topicValidation.getTopicById, topicController.getTopicById)
Router.route('/detail?:id')
  .get(topicValidation.getDetailTopicById, topicController.getDetailTopicById)
Router.route('/update')
  .put(topicValidation.updateTopic, topicController.updateTopic)
Router.route('/suport-teacher/ds-de-tai?:id')
  .get(topicValidation.getTopicByTeacherId, topicController.getTopicByTeacherId)
Router.route('/suport-teacher/xac-nhan-topics')
  .post(topicValidation.confirmTopic, topicController.confirmTopic)
Router.route('/suport-teacher/create-empty')
  .post(topicValidation.createEmptyTopic, topicController.createEmptyTopic)
export const topicRoute = Router