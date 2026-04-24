import { Router } from 'express'

import TimeDiscountController from '../controllers/TimeDiscountController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const timeDiscountRouter = Router()
const timeDiscountController = new TimeDiscountController()

timeDiscountRouter.use(ensureAuthenticated)

timeDiscountRouter.post('/', timeDiscountController.create)
timeDiscountRouter.put('/:timeDiscountId', timeDiscountController.update)

timeDiscountRouter.delete('/:timeDiscountId', timeDiscountController.delete)
timeDiscountRouter.get(
  '/options-products',
  timeDiscountController.indexOptionsProducts,
)

timeDiscountRouter.get('/', timeDiscountController.index)

timeDiscountRouter.get('/:timeDiscountId', timeDiscountController.show)

export default timeDiscountRouter
