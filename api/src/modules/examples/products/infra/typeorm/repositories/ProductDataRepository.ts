import { getRepository, Repository } from 'typeorm'
import ProductData from '../entities/ProductData'
import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'
import IProductDataRepository from '@modules/products/repositories/IProductDataRepository'
import ICreateProductDataDTO from '@modules/products/dtos/ICreateProductDataDTO'
import dataSource from '@shared/infra/typeorm'

class ProductDataRepository implements IProductDataRepository {
  private ormRepository: Repository<ProductData>

  constructor() {
    this.ormRepository = dataSource.getRepository(ProductData)
  }

  public async create(data: ICreateProductDataDTO): Promise<ProductData> {
    const created = this.ormRepository.create({
      ...data,
      dimensions: JSON.stringify(data.dimensions),
    })

    const productData = await this.ormRepository.save(created)

    return productData
  }

  public async findAndCount(
    options: IPaginationOptionsDTO,
  ): Promise<[ProductData[], number]> {
    const productData = await this.ormRepository.findAndCount({
      take: options.limit,
      skip: (options.page - 1) * options.limit,
      relations: ['user', 'product'],
    })

    return productData
  }

  public async findByProductId(productId: string): Promise<ProductData | null> {
    const productData = await this.ormRepository.findOne({
      where: {
        product_id: productId,
      },
    })

    return productData
  }

  public async findById(id: string): Promise<ProductData | null> {
    const productData = await this.ormRepository.findOne({
      where: {
        id,
      },
    })

    return productData
  }

  public async delete(id: string): Promise<void> {
    const productData = await this.ormRepository.findOne({
      where: {
        id,
      },
    })

    if (productData) {
      this.ormRepository.remove(productData)
    }
  }

  public async All(): Promise<ProductData[]> {
    const productData = await this.ormRepository.find()

    return productData
  }

  public async save(productData: ProductData): Promise<ProductData> {
    return this.ormRepository.save(productData)
  }
}

export default ProductDataRepository
