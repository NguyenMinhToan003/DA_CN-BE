import express from 'express'
import { authRoute } from './authRoute'
import { studentRoute } from './studentRoute'
import { topicRoute } from './topicRoute'
import { teacherRoute } from './teacherRoute'
import { resourceRoute } from './resourceRoute'
const Router = express.Router()

Router.use('/auth', authRoute)
Router.use('/student', studentRoute)
Router.use('/teacher', teacherRoute)
Router.use('/resource', resourceRoute)
Router.use('/topic', topicRoute)

export const APIs_v1 = Router