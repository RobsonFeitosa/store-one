import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import ScheduleController from '../controllers/ScheduleController'

const couponsRouter = Router()
const scheduleController = new ScheduleController()

couponsRouter.use(ensureAuthenticated)

couponsRouter.post('/', scheduleController.create)
couponsRouter.delete('/:scheduleId', scheduleController.delete)
couponsRouter.get('/', scheduleController.index)
couponsRouter.get('/:scheduleId', scheduleController.show)

export default couponsRouter
