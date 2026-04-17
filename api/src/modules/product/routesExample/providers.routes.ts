import { Router } from 'express'

import ProvidersController from '../controllers/ProvidersController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const providersRouter = Router()
const providersController = new ProvidersController()

providersRouter.use(ensureAuthenticated)

providersRouter.post('/providers', providersController.create)
providersRouter.put('/providers/:providerId', providersController.update)
providersRouter.delete('/providers/:providerId', providersController.delete)
providersRouter.get('/providers', providersController.index)
providersRouter.get('/providers/:providerId', providersController.show)

export default providersRouter
