import { Request, Response } from 'express'

import { classToClass } from 'class-transformer'

import { container } from 'tsyringe'
import IndexProvidersService from '@modules/products/services/IndexProvidersService'
import ShowProviderService from '@modules/products/services/ShowProviderService'
import DeleteProviderService from '@modules/products/services/DeleteProviderService'
import CreateProvidersService from '@modules/products/services/CreateProvidersService'
import UpdateProviderService from '@modules/products/services/UpdateProviderService'

export default class ProvidersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body

    const createProductProviders = container.resolve(CreateProvidersService)

    const provider = await createProductProviders.execute(data)

    return response.json(classToClass(provider))
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const data = request.body
    const { providerId } = request.params

    const updateProvider = container.resolve(UpdateProviderService)

    const product = await updateProvider.execute(data, providerId)

    return response.json(classToClass(product))
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit = 999999 } = request.query

    const index = container.resolve(IndexProvidersService)

    const providers = await index.execute({
      page: Number(page),
      limit: Number(limit),
    })

    return response.json(classToClass(providers))
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { providerId } = request.params

    const show = container.resolve(ShowProviderService)

    const provider = await show.execute(providerId)

    return response.json(classToClass(provider))
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { providerId } = request.params

    const deleteProvider = container.resolve(DeleteProviderService)

    await deleteProvider.execute(providerId)

    return response.status(204).send()
  }
}
