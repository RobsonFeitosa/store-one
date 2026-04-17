import { Request, Response } from 'express'

import { classToClass } from 'class-transformer'

import { container } from 'tsyringe'

import CreateProductVariationsService from '@modules/products/services/CreateProductVariationsService'
import ShowProductVariationService from '@modules/products/services/ShowProductVariationService'
import UpdateProductVariationService from '@modules/products/services/UpdateProductVariationService'
import DeleteProductVariationService from '@modules/products/services/DeleteProductVariationService'

export default class ProductsVariationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body
    const { attributeId } = request.params

    const createproductData = container.resolve(CreateProductVariationsService)

    const productData = await createproductData.execute({
      payload: data,
      attributeId,
    })

    return response.json(classToClass(productData))
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { attributeId, variationId } = request.params

    const showVariation = container.resolve(ShowProductVariationService)

    const variation = await showVariation.execute({
      variationId,
      attributeId,
    })

    return response.json(classToClass(variation))
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const data = request.body
    const { attributeId, variationId } = request.params

    const updateVariation = container.resolve(UpdateProductVariationService)

    const variation = await updateVariation.execute({
      payload: data,
      attributeId,
      variationId,
    })

    return response.json(classToClass(variation))
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { attributeId, variationId } = request.params

    const variation = container.resolve(DeleteProductVariationService)

    await variation.execute(variationId, attributeId)

    return response.status(204).send()
  }
}
