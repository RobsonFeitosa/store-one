import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO'
import ICreateProductDataDTO from '../dtos/ICreateProductDataDTO'
import ProductData from '../infra/typeorm/entities/ProductData'

export default interface IProductDataRepository {
  create(data: ICreateProductDataDTO): Promise<ProductData>
  findById(id: string): Promise<ProductData | null>
  findAndCount(
    options: IPaginationOptionsDTO,
    userId: string,
  ): Promise<[ProductData[], number]>
  findByProductId(productId: string): Promise<ProductData | null>
  delete(id: string): Promise<void>
  save(productData: ProductData): Promise<ProductData>
  All(): Promise<ProductData[]>
}
