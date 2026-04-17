import { injectable, inject } from 'tsyringe'

import Product from '../infra/typeorm/entities/Product'
import IProductsRepository from '../repositories/IProductsRepository'
import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO'
import IWishRepository from '../repositories/IWishRepository'

@injectable()
class IndexProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('WishRepository')
    private wishRepository: IWishRepository,
  ) {}

  public async execute(
    options: IPaginationOptionsDTO,
    userId: string | undefined,
    onlyDiscount: boolean | undefined,
  ): Promise<[Product[], number]> {
    const products = await this.productsRepository.findAndCount(
      options,
      userId,
      onlyDiscount,
    )

    for (const product of products[0]) {
      const wish = await this.wishRepository.findByProductAndUser(
        product.id,
        userId,
      )
      product.wish = wish ?? null
    }

    // console.log({ products: products[0] })

    return products
  }
}

export default IndexProductsService
