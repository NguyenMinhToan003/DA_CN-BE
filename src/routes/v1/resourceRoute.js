import express from 'express'
import { resourceValidation } from '../../validations/resourceValidation'
import { resourceController } from '../../controllers/resourceController'
import { uploadMulter } from '../../configs/cloundinary'
const Router = express.Router()

Router.route('/upload')
  .post(resourceValidation.uploadResource, uploadMulter().single('file'), resourceController.uploadResource)

export const resourceRoute = Router