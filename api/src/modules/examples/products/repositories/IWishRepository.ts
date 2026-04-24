import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO'
import { ICreateWishDTO } from '@modules/dtos/IWishDTO'
import ProductWish from '../infra/typeorm/entities/ProductWish'

export default interface IWishRepository {
  create(data: ICreateWishDTO): Promise<ProductWish>
  findById(id: string): Promise<ProductWish | null>
  findAndCount(
    options: IPaginationOptionsDTO,
    userId: string,
  ): Promise<[ProductWish[], number]>
  findByProductAndUser(
    productId: string,
    userId?: string,
  ): Promise<ProductWish | null>
  delete(id: string): Promise<void>
  save(wish: ProductWish): Promise<ProductWish>
  All(): Promise<ProductWish[]>
}
