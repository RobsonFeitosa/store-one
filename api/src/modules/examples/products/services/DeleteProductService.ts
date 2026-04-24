import AppError from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'

import IProductsRepository from '../repositories/IProductsRepository'

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const product = await this.productsRepository.findById(id)

    if (!product) {
      throw new AppError('Product not exist')
    }

    product.deleted_at = new Date()

    await this.productsRepository.save(product)
  }
}

export default DeleteProductService
