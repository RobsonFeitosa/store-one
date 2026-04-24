import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import CustomersController from '../controllers/CustomersController'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const customersRouter = Router()
const customersController = new CustomersController()

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      level: Joi.string(),
      phone: Joi.string(),
      cpf: Joi.string(),
    },
  }),
  customersController.create,
)

customersRouter.use(ensureAuthenticated)

export default customersRouter
