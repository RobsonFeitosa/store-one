import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import IProductsRepository from '../repositories/IProductsRepository'

@injectable()
class UpdateRemoveTimeDiscountOfProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(productId: string): Promise<void> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new AppError('Product not found')
    }

    product.time_discount = null

    await this.productsRepository.save(product)
  }
}

export default UpdateRemoveTimeDiscountOfProductService
