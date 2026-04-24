import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO'
import { ICreateProductVariationsDTO } from '../dtos/ICreateProductVariationsDTO'
import ProductVariations from '../infra/typeorm/entities/ProductVariations'

export default interface IProductVariationsRespository {
  create(data: ICreateProductVariationsDTO): Promise<ProductVariations>
  findById(id: string): Promise<ProductVariations | null>
  findAndCount(
    options: IPaginationOptionsDTO,
    userId: string,
  ): Promise<[ProductVariations[], number]>
  delete(id: string): Promise<void>
  save(ProductVariations: ProductVariations): Promise<ProductVariations>
  All(): Promise<ProductVariations[]>
}
