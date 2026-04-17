import { inject, injectable } from 'tsyringe'
import IProductsRepository from '../repositories/IProductsRepository'

interface IOptionsProductsTimeDiscount {
  label: string
  value: string
}

@injectable()
class IndexTimeDiscountAvailableProduct {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(): Promise<IOptionsProductsTimeDiscount[]> {
    const timeDiscounts = await this.productsRepository.findByTimeDiscountNull()

    const productsOptions = timeDiscounts.map((product) => ({
      label: product.name,
      value: product.id,
    }))

    return productsOptions
  }
}

export default IndexTimeDiscountAvailableProduct
