import express from 'express'
import { authRoute } from './authRoute'
const Router = express.Router()

Router.use('/auth', authRoute)

export const APIs_v1 = Router