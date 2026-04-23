import { Router } from 'express'

import ProfessionalController from '../controllers/ProfessionalController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const professionalRouter = Router()
const crofessionalController = new ProfessionalController()

professionalRouter.get('/availables', crofessionalController.indexAllAvailable)
professionalRouter.use(ensureAuthenticated)
professionalRouter.post('/', crofessionalController.create)
professionalRouter.put('/:professionalId', crofessionalController.update)
professionalRouter.post('/send-invite', crofessionalController.sendActive)
professionalRouter.get(
  '/users-availables',
  crofessionalController.indexUsersAvailable,
)
professionalRouter.get('/:professionalId', crofessionalController.show)
professionalRouter.get('/', crofessionalController.index)
professionalRouter.delete('/:professionalId', crofessionalController.delete)

export default professionalRouter
