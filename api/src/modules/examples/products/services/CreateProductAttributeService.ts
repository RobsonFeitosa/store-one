import { inject, injectable } from 'tsyringe'
import ProductAttributes from '../infra/typeorm/entities/ProductAttributes'

import ICreateProductAttributesDTO from '../dtos/ICreateProductAttributesDTO'
import IProductAttributesRepository from '../repositories/IProductAttributesRepository'
import IProductsRepository from '../repositories/IProductsRepository'
import AppError from '@shared/errors/AppError'

interface Options {
  label: string
  value: string
}

@injectable()
class CreateProductAttributesService {
  constructor(
    @inject('ProductAttributesRepository')
    private productAttributesRepository: IProductAttributesRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(
    payload: ICreateProductAttributesDTO,
    productId: string,
  ): Promise<ProductAttributes> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new AppError('Product not found')
    }

    const attributeNameExist =
      await this.productAttributesRepository.findByName(productId, payload.name)

    if (attributeNameExist) {
      throw new AppError('Attribute already exists')
    }

    const productAttr = await this.productAttributesRepository.create({
      ...payload,
      product_id: product.id,
    })

    return productAttr
  }
}

export default CreateProductAttributesService
