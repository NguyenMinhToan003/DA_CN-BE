import express from 'express'
import { resourceValidation } from '../../validations/resourceValidation'
import { resourceController } from '../../controllers/resourceController'
import { uploadMulter } from '../../configs/cloundinary'
const Router = express.Router()

Router.route('/upload')
  .post(
    uploadMulter().any('file', 5),
    resourceValidation.uploadResource,
    resourceController.uploadResource
  )
Router.route('/ds-resource')
  .get(resourceValidation.getDsResource, resourceController.getDsResource)

export const resourceRoute = Router