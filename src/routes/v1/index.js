import express from 'express'
import { authRoute } from './authRoute'
import { studentRoute } from './studentRoute'
import { topicRoute } from './topicRoute'
const Router = express.Router()

Router.use('/auth', authRoute)
Router.use('/student', studentRoute)
Router.use('/topic', topicRoute)

export const APIs_v1 = Router