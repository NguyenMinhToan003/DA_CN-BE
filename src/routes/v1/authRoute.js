import express from 'express'
import { authController } from '../../controllers/authController'
import { authValidation } from '../../validations/authValidation'
const Router = express.Router()

Router.route('/teacher/login')
  .post(authValidation.loginTeacher, authController.loginTeacher)
Router.route('/student/login')
  .post(authValidation.loginStudent, authController.loginStudent)
Router.route('/teacher/register')
  .post(authValidation.registerWithTeacher, authController.registerWithTeacher)
Router.route('/student/register')
  .post(authValidation.registerWithStudent, authController.registerWithStudent)

export const authRoute = Router