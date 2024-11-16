import express from 'express'
import { teacherController } from '../../controllers/teacherController.js'
import { teacherValidation } from '../../validations/teacherValidation.js'
const Router = express.Router()

Router.route('/ds-giang-vien')
  .get(teacherController.getTeachers)
Router.route('/confim-students')
  .post(teacherValidation.confirmStudents, teacherController.confirmStudents)
export const teacherRoute = Router