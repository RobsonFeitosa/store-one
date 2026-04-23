import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { classToClass } from 'class-transformer'
import CreateProfessionalService from '@modules/users/services/CreateProfessionalService'
import ShowProfessionalService from '@modules/users/services/ShowProfessionalService'
import UpdateProfessionalService from '@modules/users/services/UpdateProfessionalService'
import SendEmailProfessionalService from '@modules/users/services/SendEmailProfessionalService'
import IndexProfessionalService from '@modules/users/services/IndexProfessionalService'
import IndexUsersProfessionalAvailableService from '@modules/users/services/IndexUsersProfessionalAvailableService'
import DeleteProfessionalService from '@modules/users/services/DeleteProfessionalService'
import indexProfessionalAvailableService from '@modules/users/services/indexProfessionalAvailableService'

export default class ProfessionalController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createService = container.resolve(CreateProfessionalService)

    const professional = await createService.execute(req.body)

    return res.json(professional)
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { professionalId } = req.params

    const showService = container.resolve(ShowProfessionalService)

    const professional = await showService.execute(professionalId)

    return res.json(professional)
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { professionalId } = req.params
    const data = req.body

    const updateService = container.resolve(UpdateProfessionalService)

    const update = await updateService.execute(data, professionalId)

    return res.json(update)
  }

  public async sendActive(req: Request, res: Response): Promise<Response> {
    const { email } = req.body

    const showService = container.resolve(SendEmailProfessionalService)

    const professional = await showService.execute(email)

    return res.json(professional)
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit = 999999 } = request.query

    const indexService = container.resolve(IndexProfessionalService)

    const professionals = await indexService.execute({
      page: Number(page),
      limit: Number(limit),
    })

    return response.json(classToClass(professionals))
  }

  public async indexAllAvailable(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const indexService = container.resolve(indexProfessionalAvailableService)

    const professionals = await indexService.execute()

    return response.json(classToClass(professionals))
  }

  public async indexUsersAvailable(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { page = 1, limit = 999999 } = request.query

    const indexService = container.resolve(
      IndexUsersProfessionalAvailableService,
    )

    const users = await indexService.execute({
      page: Number(page),
      limit: Number(limit),
    })

    return response.json(users)
  }

  public async delete(request: Request, response: Response): Promise<any> {
    const { professionalId } = request.params

    const deleteService = container.resolve(DeleteProfessionalService)

    await deleteService.execute(professionalId)

    return response.status(204).send()
  }
}
