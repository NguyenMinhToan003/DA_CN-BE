import express from 'express'
import { studentValidation } from '../../validations/studentValidation'
import { studentController } from '../../controllers/studentController'
const Router = express.Router()

Router.route('/dk-de-tai')
  .get(studentValidation.student_topic, studentController.student_topic)
Router.route('/dk-giao-vien')
  .get(studentValidation.student_teacher, studentController.student_teacher)
export const studentRoute = Router