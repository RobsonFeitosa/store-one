import { Repository } from 'typeorm'
import ProductVariations from '../entities/ProductVariations'
import dataSource from '@shared/infra/typeorm'
import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'
import { ICreateProductVariationsDTO } from '@modules/products/dtos/ICreateProductVariationsDTO'
import IProductVariationsRespository from '@modules/products/repositories/IProductVariationsRespository'

class ProductVariationsRespository implements IProductVariationsRespository {
  private ormRepository: Repository<ProductVariations>

  constructor() {
    this.ormRepository = dataSource.getRepository(ProductVariations)
  }

  public async create(
    data: ICreateProductVariationsDTO,
  ): Promise<ProductVariations> {
    const created = this.ormRepository.create({
      ...data,
      dimensions: JSON.stringify(data.dimensions),
    })

    const productAttr = await this.ormRepository.save(created)

    return productAttr
  }

  public async findAndCount(
    options: IPaginationOptionsDTO,
    userId: string,
  ): Promise<[ProductVariations[], number]> {
    const productAttr = await this.ormRepository.findAndCount({
      take: options.limit,
      skip: (options.page - 1) * options.limit,
      relations: ['user', 'product'],
      order: {
        created_at: 'DESC',
      },
    })

    return productAttr
  }

  public async findById(id: string): Promise<ProductVariations | null> {
    const productAttr = await this.ormRepository.findOne({
      where: {
        id,
      },
    })

    return productAttr
  }

  public async delete(id: string): Promise<void> {
    const productAttr = await this.ormRepository.findOne({
      where: {
        id,
      },
    })

    if (productAttr) {
      this.ormRepository.remove(productAttr)
    }
  }

  public async All(): Promise<ProductVariations[]> {
    const productAttr = await this.ormRepository.find()

    return productAttr
  }

  public async save(
    productAttr: ProductVariations,
  ): Promise<ProductVariations> {
    return this.ormRepository.save(productAttr)
  }
}

export default ProductVariationsRespository
