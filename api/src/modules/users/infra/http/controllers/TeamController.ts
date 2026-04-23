import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateTeamService from '@modules/users/services/CreateTeamService'
import ShowTeamService from '@modules/users/services/ShowTeamService'
import IndexTeamService from '@modules/users/services/IndexTeamService'
import DeleteTeamService from '@modules/users/services/DeleteTeamService'
import IndexUsersTeamsAvailableService from '@modules/users/services/IndexUsersTeamsAvailableService'
import UpdateTeamService from '@modules/users/services/UpdateTeamService'
import IndexTeamsAvailableService from '@modules/schedule/services/IndexTeamsAvailableService'

export default class TeamController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id

    const createService = container.resolve(CreateTeamService)

    const team = await createService.execute({
      ...req.body,
      user_id,
    })

    return res.json(team)
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { teamId } = req.params

    const showService = container.resolve(ShowTeamService)

    const team = await showService.execute(teamId)

    return res.json(team)
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit = 999999 } = request.query

    const indexService = container.resolve(IndexTeamService)

    const teams = await indexService.execute({
      page: Number(page),
      limit: Number(limit),
    })

    return response.json(teams)
  }

  public async indexTeamsAvailable(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const indexService = container.resolve(IndexTeamsAvailableService)

    const teams = await indexService.execute()

    return response.json(teams)
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { teamId } = req.params
    const data = req.body

    const updateService = container.resolve(UpdateTeamService)

    const update = await updateService.execute(data, teamId)

    return res.json(update)
  }

  public async indexUsersAvailable(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const indexService = container.resolve(IndexUsersTeamsAvailableService)

    const users = await indexService.execute()

    return response.json(users)
  }

  public async delete(request: Request, response: Response): Promise<any> {
    const { teamId } = request.params

    const deleteService = container.resolve(DeleteTeamService)

    await deleteService.execute(teamId)

    return response.status(204).send()
  }
}
