import { Router } from 'express'

import ProductsDataController from '../controllers/ProductsDataController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const productsDataRouter = Router()
const productsDataController = new ProductsDataController()

productsDataRouter.use(ensureAuthenticated)

productsDataRouter.post('/:productId/data', productsDataController.create)
productsDataRouter.put('/data/:id', productsDataController.update)
productsDataRouter.delete('/data/:id', productsDataController.delete)

export default productsDataRouter
