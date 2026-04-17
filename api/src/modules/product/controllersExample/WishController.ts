import CreateWishProductService from '@modules/products/services/CreateWishProductService'
import IndexWishProductService from '@modules/products/services/IndexWishProductService'
import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'

import { container } from 'tsyringe'

export default class WishController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params
    const { id } = request.user

    const createWish = container.resolve(CreateWishProductService)

    const wish = await createWish.execute({
      product_id,
      user_id: id,
    })

    return response.json(wish)
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit = 999999 } = request.query
    const { id } = request.user

    const wishProduct = container.resolve(IndexWishProductService)

    const [wishes, total] = await wishProduct.execute(
      {
        page: Number(page),
        limit: Number(limit),
      },
      id,
    )

    return response.json([classToClass(wishes), total])
  }
}
