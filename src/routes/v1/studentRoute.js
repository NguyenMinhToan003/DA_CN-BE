import express from 'express'
import { studentValidation } from '../../validations/studentValidation'
import { studentController } from '../../controllers/studentController'
const Router = express.Router()

Router.route('/all')
  .get(studentValidation.getAllStudent, studentController.getAllStudent)
Router.route('/all/search')
  .get(studentValidation.searchStudent, studentController.searchStudent)
Router.route('/detail')
  .post(studentValidation.getStudentDetail, studentController.getStudentDetail)
Router.route('/create-topic')
  .post(studentValidation.studentRegisterTopic, studentController.studentRegisterTopic)
Router.route('/register-teacher')
  .post(studentValidation.studentRegisterTeacher, studentController.studentRegisterTeacher)

export const studentRoute = Router