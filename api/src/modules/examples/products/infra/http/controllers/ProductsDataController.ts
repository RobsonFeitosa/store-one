import { Request, Response } from 'express'

import { classToClass } from 'class-transformer'

import { container } from 'tsyringe'

import ShowProductService from '@modules/products/services/ShowProductService'
import UpdateProductService from '@modules/products/services/UpdateProductService'
import DeleteProductService from '@modules/products/services/DeleteProductService'
import CreateProductDataService from '@modules/products/services/CreateProductDataService'

export default class ProductsDataController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body
    const { productId } = request.params

    const createproductData = container.resolve(CreateProductDataService)

    const productData = await createproductData.execute({
      payload: { ...data },
      productId,
    })

    return response.json(classToClass(productData))
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const productPayload = request.body
    const { product_id: productId } = request.params

    const updateProduct = container.resolve(UpdateProductService)

    const product = await updateProduct.execute({
      productId,
      ...productPayload,
    })

    return response.json(classToClass(product))
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { slug, product_id } = request.params

    const showProduct = container.resolve(ShowProductService)

    const products = await showProduct.execute(slug, product_id)

    return response.json(classToClass(products))
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { productId } = request.params

    const delProduct = container.resolve(DeleteProductService)

    await delProduct.execute(productId)

    return response.status(204).send()
  }
}
