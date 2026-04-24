import { Repository } from 'typeorm'
import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'
import IProductProviderRepository from '@modules/products/repositories/IProductProviderRepository'
import ICreateProductProviderDTO from '@modules/products/dtos/ICreateProductProviderDTO'
import ProductProvider from '../entities/ProductProvider'
import dataSource from '@shared/infra/typeorm'

class ProductProviderRepository implements IProductProviderRepository {
  private ormRepository: Repository<ProductProvider>

  constructor() {
    this.ormRepository = dataSource.getRepository(ProductProvider)
  }

  public async create(
    data: ICreateProductProviderDTO,
  ): Promise<ProductProvider> {
    const created = this.ormRepository.create(data)

    const provider = await this.ormRepository.save(created)

    return provider
  }

  public async findAndCount(
    options: IPaginationOptionsDTO,
  ): Promise<[ProductProvider[], number]> {
    const providers = await this.ormRepository.findAndCount({
      take: options.limit,
      skip: (options.page - 1) * options.limit,
      order: {
        created_at: 'DESC',
      },
    })

    return providers
  }

  public async findById(id: string): Promise<ProductProvider | null> {
    const provider = await this.ormRepository.findOne({
      where: {
        id,
      },
    })

    return provider
  }

  public async delete(id: string): Promise<void> {
    const provider = await this.ormRepository.findOne({
      where: {
        id,
      },
    })

    if (provider) {
      this.ormRepository.remove(provider)
    }
  }

  public async All(): Promise<ProductProvider[]> {
    const provider = await this.ormRepository.find()

    return provider
  }

  public async save(data: ProductProvider): Promise<ProductProvider> {
    return this.ormRepository.save(data)
  }
}

export default ProductProviderRepository
