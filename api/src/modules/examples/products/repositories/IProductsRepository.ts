import Product from '../infra/typeorm/entities/Product'

import ICreateProductDTO from '../dtos/ICreateProductDTO'
import IUpdateProductsQuantityDTO from '../dtos/IUpdateProductsQuantityDTO'
import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO'
import {
  IFilterOrderProduct,
  IFilterProduct,
} from '../infra/typeorm/repositories/ProductsRepository'

interface IFindForId {
  id: string
}

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>
  findById(product_id: string): Promise<Product | null>
  findBySlugAndId(slug: string, product_id: string): Promise<Product | null>
  findByName(name: string): Promise<Product | null>
  findByTimeDiscountNull(): Promise<Product[]>
  findProductsAndServicesAll(
    options: IPaginationOptionsDTO,
  ): Promise<[Product[], number]>
  findEmphasis(): Promise<Product | null>
  findByTimeDiscountId(id: string): Promise<Product | null>
  findAndCount(
    optoins: IPaginationOptionsDTO,
    filter: IFilterProduct,
    order: IFilterOrderProduct,
  ): Promise<[Product[], number]>
  findAllById(products: IFindForId[]): Promise<Product[]>
  updateQuantity(products: IUpdateProductsQuantityDTO[]): Promise<Product[]>
  delete(id: string): Promise<void>
  save(product: Product): Promise<Product>
  All(): Promise<Product[]>
}
