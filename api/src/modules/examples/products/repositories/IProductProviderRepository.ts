import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO'
import ICreateProductProviderDTO from '../dtos/ICreateProductProviderDTO'
import ProductProvider from '../infra/typeorm/entities/ProductProvider'

export default interface IProductProviderRepository {
  create(data: ICreateProductProviderDTO): Promise<ProductProvider>
  findById(id: string): Promise<ProductProvider | null>
  findAndCount(
    options: IPaginationOptionsDTO,
  ): Promise<[ProductProvider[], number]>
  delete(id: string): Promise<void>
  save(data: ProductProvider): Promise<ProductProvider>
  All(): Promise<ProductProvider[]>
}
