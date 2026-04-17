import { Router } from 'express'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import ProductsAttributesController from '../controllers/ProductsAttributesController'

const productsAttrRouter = Router()
const productsAttributesController = new ProductsAttributesController()

productsAttrRouter.use(ensureAuthenticated)

productsAttrRouter.post(
  '/:productId/attributes',
  productsAttributesController.create,
)
productsAttrRouter.put(
  '/:productId/attributes/:attributeId',
  productsAttributesController.update,
)
productsAttrRouter.get(
  '/:productId/attributes',
  productsAttributesController.index,
)
productsAttrRouter.delete(
  '/:productId/attributes/:id',
  productsAttributesController.delete,
)

export default productsAttrRouter
