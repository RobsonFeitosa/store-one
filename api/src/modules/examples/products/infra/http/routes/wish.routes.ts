import { Router } from 'express'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import WishController from '../controllers/WishController'

import './wish.swagger'

const wishRoute = Router()
const wishController = new WishController()

wishRoute.use(ensureAuthenticated)

wishRoute.post('/wish/:product_id', wishController.create)

wishRoute.get('/wish/', wishController.index)

export default wishRoute
