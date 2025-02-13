import express from 'express'
import { teacherController } from '../../controllers/teacherController.js'
import { teacherValidation } from '../../validations/teacherValidation.js'
const Router = express.Router()

Router.route('/ds-giang-vien')
  .get(teacherController.getTeachers)
Router.route('/confim-students')
  .post(teacherValidation.confirmStudents, teacherController.confirmStudents)

Router.route('/ds-sinh-vien-byId')
  .get(teacherValidation.getStudentsByTeacherId, teacherController.getStudentsByTeacherId)
Router.route('/ds-sinh-vien-byKey')
  .get(teacherValidation.getStudentsByTeacherKey, teacherController.getStudentsByTeacherKey)

Router.route('/create-topic')
  .post(teacherValidation.teacherCreateTopic, teacherController.teacherCreateTopic)
export const teacherRoute = Router