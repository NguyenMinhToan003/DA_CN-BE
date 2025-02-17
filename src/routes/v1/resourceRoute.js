import express from 'express'
import { resourceValidation } from '../../validations/resourceValidation'
import { resourceController } from '../../controllers/resourceController'
import { uploadMulter } from '../../middle/multer'


const Router = express.Router()

Router.route('/upload')
  .post(
    uploadMulter.array('files', 10),
    resourceValidation.uploadResource,
    resourceController.uploadResource
  )
Router.route('/ds-resource')
  .post(resourceValidation.getDsResource, resourceController.getDsResource)

Router.route('/delete')
  .post(resourceValidation.deleteResource, resourceController.deleteResource)

Router.route('/edit')
  .post(
    uploadMulter.array('files', 10),
    resourceValidation.editResource,
    resourceController.editResource)
export const resourceRoute = Router