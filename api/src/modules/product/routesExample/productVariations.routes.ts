import { Router } from 'express'

import uploadConfig from '@config/upload'
import ProductsVariationsController from '../controllers/ProductsVariationsController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import multer from 'multer'

const productsVariationsRouter = Router()
const productsVariationsController = new ProductsVariationsController()

productsVariationsRouter.use(ensureAuthenticated)

const upload = multer(uploadConfig.multer)

productsVariationsRouter.post(
  '/attributes/:attributeId/variations',
  productsVariationsController.create,
)

productsVariationsRouter.get(
  '/attributes/:attributeId/variations/:variationId',
  productsVariationsController.show,
)

productsVariationsRouter.put(
  '/attributes/:attributeId/variations/:variationId',
  productsVariationsController.update,
)

productsVariationsRouter.delete(
  '/attributes/:attributeId/variations/:variationId',
  productsVariationsController.delete,
)

export default productsVariationsRouter
