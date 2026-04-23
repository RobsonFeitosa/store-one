import { Router } from 'express'

import TeamController from '../controllers/TeamController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const teamRouter = Router()
const teamController = new TeamController()

teamRouter.use(ensureAuthenticated)

teamRouter.post('/', teamController.create)
teamRouter.put('/:teamId', teamController.update)
teamRouter.get('/users-availables', teamController.indexUsersAvailable)
teamRouter.get('/:teamId', teamController.show)
teamRouter.get('/', teamController.index)
teamRouter.get('/available', teamController.indexTeamsAvailable)
teamRouter.delete('/:teamId', teamController.delete)

export default teamRouter
