import AppError from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'

import IProductAttributesRepository from '../repositories/IProductAttributesRepository'
import IProductsRepository from '../repositories/IProductsRepository'

@injectable()
class DeleteProductAttributeService {
  constructor(
    @inject('ProductAttributesRepository')
    private productAttributesRepository: IProductAttributesRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(productId: string, attributeId: string): Promise<void> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new AppError('Product not found')
    }

    const attribute =
      await this.productAttributesRepository.findById(attributeId)

    if (!attribute) {
      throw new AppError('Attribute not exist')
    }

    await this.productAttributesRepository.delete(attributeId)
  }
}

export default DeleteProductAttributeService
