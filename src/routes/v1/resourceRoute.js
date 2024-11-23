import express from 'express'
import { resourceValidation } from '../../validations/resourceValidation'
import { resourceController } from '../../controllers/resourceController'
const Router = express.Router()

Router.route('/upload')
  .post(resourceValidation.uploadResource, resourceController.uploadResource)

export const resourceRoute = Router