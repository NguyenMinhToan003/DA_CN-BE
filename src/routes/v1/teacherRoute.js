import express from 'express'
import { teacherController } from '../../controllers/teacherController.js'
const Router = express.Router()

Router.route('/ds-giang-vien')
  .get(teacherController.getTeachers)

export const teacherRoute = Router