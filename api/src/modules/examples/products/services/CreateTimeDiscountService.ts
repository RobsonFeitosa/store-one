import { inject, injectable } from 'tsyringe'
import TimeDiscount from '../infra/typeorm/entities/TimeDiscount'
import ITimeDiscountRepository from '../repositories/ITimeDiscountRepository'
import { ICreateTimeDiscountDTO } from '../dtos/ICreateTimeDiscountDTO'
import IProductsRepository from '../repositories/IProductsRepository'

interface CreateTimeDiscountProps extends ICreateTimeDiscountDTO {
  productIds: string[]
}

@injectable()
class CreateTimeDiscountService {
  constructor(
    @inject('TimeDiscountRepository')
    private TimeDiscountRepository: ITimeDiscountRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(
    payload: CreateTimeDiscountProps,
  ): Promise<TimeDiscount> {
    const { productIds, ...rest } = payload

    const timeDiscount = await this.TimeDiscountRepository.create(rest)
    for (const productId of productIds) {
      const product = await this.productsRepository.findById(productId)

      if (product) {
        product.time_discount = timeDiscount

        await this.productsRepository.save(product)
      }
    }

    return timeDiscount
  }
}

export default CreateTimeDiscountService
