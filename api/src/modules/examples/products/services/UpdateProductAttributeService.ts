import { inject, injectable } from 'tsyringe'
import ProductAttributes from '../infra/typeorm/entities/ProductAttributes'

import ICreateProductAttributesDTO from '../dtos/ICreateProductAttributesDTO'
import IProductAttributesRepository from '../repositories/IProductAttributesRepository'
import IProductsRepository from '../repositories/IProductsRepository'
import AppError from '@shared/errors/AppError'

@injectable()
class UpdateProductAttributeService {
  constructor(
    @inject('ProductAttributesRepository')
    private productAttributesRepository: IProductAttributesRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(
    payload: ICreateProductAttributesDTO,
    productId: string,
    attributeId: string,
  ): Promise<ProductAttributes> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new AppError('Product not found')
    }

    const attribute =
      await this.productAttributesRepository.findById(attributeId)

    if (!attribute) {
      throw new AppError('Attribute not found')
    }

    attribute.name = payload.name
    attribute.options = JSON.stringify(payload.options)

    await this.productAttributesRepository.save(attribute)

    return attribute
  }
}

export default UpdateProductAttributeService
