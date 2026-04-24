import { Repository } from 'typeorm'
import ProductWish from '../entities/ProductWish'
import dataSource from '@shared/infra/typeorm'
import IWishRepository from '@modules/products/repositories/IWishRepository'
import { ICreateWishDTO } from '@modules/dtos/IWishDTO'
import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'

class WishRepository implements IWishRepository {
  private ormRepository: Repository<ProductWish>

  constructor() {
    this.ormRepository = dataSource.getRepository(ProductWish)
  }

  public async create(data: ICreateWishDTO): Promise<ProductWish> {
    const created = this.ormRepository.create(data)

    const wish = await this.ormRepository.save(created)

    return wish
  }

  public async findAndCount(
    options: IPaginationOptionsDTO,
    userId?: string,
  ): Promise<[ProductWish[], number]> {
    const wish = await this.ormRepository.findAndCount({
      take: options.limit,
      skip: (options.page - 1) * options.limit,
      where: {
        user_id: userId,
      },
      relations: ['user', 'product'],
    })

    return wish
  }

  public async findByProductAndUser(
    productId: string,
    userId: string,
  ): Promise<ProductWish | null> {
    const wish = await this.ormRepository.findOne({
      where: {
        product_id: productId,
        user_id: userId,
      },
    })

    return wish
  }

  public async findById(id: string): Promise<ProductWish | null> {
    const wish = await this.ormRepository.findOne({
      where: {
        id,
      },
    })

    return wish
  }

  public async delete(id: string): Promise<void> {
    const wish = await this.ormRepository.findOne({
      where: {
        id,
      },
    })

    if (wish) {
      this.ormRepository.remove(wish)
    }
  }

  public async All(): Promise<ProductWish[]> {
    const wish = await this.ormRepository.find()

    return wish
  }

  public async save(wish: ProductWish): Promise<ProductWish> {
    return this.ormRepository.save(wish)
  }
}

export default WishRepository
