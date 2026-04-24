import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import DiscountCouponController from '../controllers/DiscountCouponController'

const couponsRouter = Router()
const discountCouponController = new DiscountCouponController()

couponsRouter.use(ensureAuthenticated)

couponsRouter.post('/', discountCouponController.create)
couponsRouter.put('/', discountCouponController.update)
couponsRouter.delete('/:id', discountCouponController.delete)
couponsRouter.get('/', discountCouponController.index)
couponsRouter.get('/code/:code', discountCouponController.show)

export default couponsRouter
