import express from 'express'
import { authController } from '../../controllers/authController'
import { authValidation } from '../../validations/authValidation'
const Router = express.Router()
Router.route('/login')
  .post(authValidation.login, authController.login)
Router.route('/teacher/register')
  .post(authValidation.registerWithTeacher, authController.registerWithTeacher)
Router.route('/student/register')
  .post(authValidation.registerWithStudent, authController.registerWithStudent)
export const authRoute = Router