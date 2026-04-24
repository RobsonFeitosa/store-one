import { injectable, inject } from 'tsyringe'

import IWishRepository from '../repositories/IWishRepository'
import ProductWish from '../infra/typeorm/entities/ProductWish'

interface IRequest {
  product_id: string
  user_id: string
}

@injectable()
class CreateWishProductService {
  constructor(
    @inject('WishRepository')
    private wishRepository: IWishRepository,
  ) {}

  public async execute(data: IRequest): Promise<ProductWish | undefined> {
    const checkWish = await this.wishRepository.findByProductAndUser(
      data.product_id,
      data.user_id,
    )

    if (!checkWish) {
      const wish = await this.wishRepository.create(data)

      return wish
    }

    await this.wishRepository.delete(checkWish.id)
  }
}

export default CreateWishProductService
