import { injectable, inject } from 'tsyringe'

import IWishRepository from '../repositories/IWishRepository'
import ProductWish from '../infra/typeorm/entities/ProductWish'
import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'

@injectable()
class IndexWishProductService {
  constructor(
    @inject('WishRepository')
    private wishRepository: IWishRepository,
  ) {}

  public async execute(
    options: IPaginationOptionsDTO,
    userId: string,
  ): Promise<[ProductWish[], number]> {
    const wishes = await this.wishRepository.findAndCount(options, userId)

    return wishes
  }
}

export default IndexWishProductService
