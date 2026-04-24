import { Request, Response } from 'express'

import { classToClass } from 'class-transformer'

import { container } from 'tsyringe'

import ShowProductService from '@modules/products/services/ShowProductService'
import DeleteProductService from '@modules/products/services/DeleteProductService'
import CreateProductAttributeService from '@modules/products/services/CreateProductAttributeService'
import UpdateProductAttributeService from '@modules/products/services/UpdateProductAttributeService'
import IndexProductAttributesService from '@modules/products/services/IndexProductAttributesService'
import DeleteProductAttributeService from '@modules/products/services/DeleteProductAttributeService'

export default class ProductsAttributesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body
    const { productId } = request.params

    const createAttribute = container.resolve(CreateProductAttributeService)

    const attributes = await createAttribute.execute({ ...data }, productId)

    return response.json(classToClass(attributes))
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const data = request.body
    const { productId, attributeId } = request.params

    const updateAttribute = container.resolve(UpdateProductAttributeService)

    const attribute = await updateAttribute.execute(
      data,
      productId,
      attributeId,
    )

    return response.json(classToClass(attribute))
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit = 999999 } = request.query
    const { productId } = request.params

    const indexAttributes = container.resolve(IndexProductAttributesService)

    const attributes = await indexAttributes.execute(
      {
        page: Number(page),
        limit: Number(limit),
      },
      productId,
    )

    return response.json(classToClass(attributes))
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { slug, product_id } = request.params

    const showProduct = container.resolve(ShowProductService)

    const products = await showProduct.execute(slug, product_id)

    return response.json(classToClass(products))
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { productId, attributeId } = request.params

    const attrProduct = container.resolve(DeleteProductAttributeService)

    await attrProduct.execute(productId, attributeId)

    return response.status(204).send()
  }
}
