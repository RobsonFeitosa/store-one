import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import CategoriesController from '../controllers/CategoriesController'

const categoriesRouter = Router()
const categoriesController = new CategoriesController()

// categoriesRouter.use(ensureAuthenticated)

categoriesRouter.post('/', categoriesController.create)
categoriesRouter.put('/:id', categoriesController.update)
categoriesRouter.delete('/:id', categoriesController.delete)
categoriesRouter.get('/', categoriesController.index)

export default categoriesRouter
