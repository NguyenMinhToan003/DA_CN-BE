import express from 'express'
import { studentValidation } from '../../validations/studentValidation'
import { studentController } from '../../controllers/studentController'
const Router = express.Router()

Router.route('/dk-giang-vien')
  .post(studentValidation.student_teacher, studentController.student_teacher)
export const studentRoute = Router