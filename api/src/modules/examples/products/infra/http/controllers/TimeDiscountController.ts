import { Request, Response } from 'express'

import { classToClass } from 'class-transformer'

import { container } from 'tsyringe'
import CreateTimeDiscountService from '@modules/products/services/CreateTimeDiscountService'
import IndexTimeDiscountService from '@modules/products/services/IndexTimeDiscountService'
import ShowTimeDiscountService from '@modules/products/services/ShowTimeDiscountService'
import DeleteTimeDiscountService from '@modules/products/services/DeleteTimeDiscountService'
import IndexOptionsProductsExeptionByTimeDiscount from '@modules/products/services/IndexTimeDiscountAvailableProduct'
import UpdateTimeDiscountService from '@modules/products/services/UpdateTimeDiscountService'

export default class TimeDiscountController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body

    const createService = container.resolve(CreateTimeDiscountService)

    const timeDiscount = await createService.execute(data)

    return response.json(classToClass(timeDiscount))
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const data = request.body
    const { timeDiscountId } = request.params

    const updatService = container.resolve(UpdateTimeDiscountService)

    const timeDiscount = await updatService.execute(timeDiscountId, data)

    return response.json(classToClass(timeDiscount))
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit = 999999 } = request.query

    const indexService = container.resolve(IndexTimeDiscountService)

    const timeDiscounts = await indexService.execute({
      page: Number(page),
      limit: Number(limit),
    })

    return response.json(classToClass(timeDiscounts))
  }

  public async indexOptionsProducts(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const indexService = container.resolve(
      IndexOptionsProductsExeptionByTimeDiscount,
    )

    const timeDiscounts = await indexService.execute()

    return response.json(classToClass(timeDiscounts))
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { timeDiscountId } = request.params

    const showService = container.resolve(ShowTimeDiscountService)

    const timeDiscount = await showService.execute(timeDiscountId)

    return response.json(classToClass(timeDiscount))
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { timeDiscountId } = request.params

    const deleteService = container.resolve(DeleteTimeDiscountService)

    await deleteService.execute(timeDiscountId)

    return response.status(204).send()
  }
}
