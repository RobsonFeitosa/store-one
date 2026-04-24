import { Router } from 'express'

import ProductsController from '../controller/ProductsController'

const productsRootRouter = Router()
const productsController = new ProductsController()

productsRootRouter.get('/:slug/:product_id', productsController.show)

export default productsRootRouter
