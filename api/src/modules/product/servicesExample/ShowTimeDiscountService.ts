import { inject, injectable } from 'tsyringe'
import TimeDiscount from '../infra/typeorm/entities/TimeDiscount'
import ITimeDiscountRepository from '../repositories/ITimeDiscountRepository'
import AppError from '@shared/errors/AppError'
import IProductsRepository from '../repositories/IProductsRepository'

@injectable()
class ShowTimeDiscountService {
  constructor(
    @inject('TimeDiscountRepository')
    private TimeDiscountRepository: ITimeDiscountRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(timeDiscountId: string): Promise<TimeDiscount> {
    const timeDiscount =
      await this.TimeDiscountRepository.findById(timeDiscountId)

    if (!timeDiscount) {
      throw new AppError('Time discount not found')
    }
    const productsIds = timeDiscount.products.map((product) => product.id)

    const products = []
    for (const productId of productsIds) {
      const product = await this.productsRepository.findById(productId)

      if (!product) {
        throw new AppError('Product not found')
      }

      products.push(product)
    }

    timeDiscount.products = products

    return timeDiscount
  }
}

export default ShowTimeDiscountService
