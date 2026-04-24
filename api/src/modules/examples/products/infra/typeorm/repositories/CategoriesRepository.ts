import { FindOptionsWhere, Repository } from 'typeorm'

import dataSource from '@shared/infra/typeorm'
import ICategoriesRepository from '@modules/products/repositories/ICategoriesRepository'
import ICreateCategoriesDTO from '@modules/products/dtos/ICreateCategoriesDTO'

import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'
import Categories from '../entities/ProductCategory'

interface IFindForId {
  id: string
}

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Categories>

  constructor() {
    this.ormRepository = dataSource.getRepository(Categories)
  }

  public async create(data: ICreateCategoriesDTO): Promise<Categories> {
    const categoryCreated = this.ormRepository.create(data)

    await this.ormRepository.save(categoryCreated)

    return categoryCreated
  }

  public async findByName(name: string): Promise<Categories | null> {
    const findCategory = await this.ormRepository.findOne({
      where: {
        name,
      },
    })

    return findCategory
  }

  public async findById(id: string): Promise<Categories | null> {
    const findCategory = await this.ormRepository.findOne({
      where: {
        id,
      },
    })

    return findCategory
  }

  public async delete(id: string): Promise<void> {
    const category = await this.ormRepository.findOne({
      where: {
        id,
      },
    })

    if (category) {
      this.ormRepository.remove(category)
    }
  }

  public async findAndCount(
    options: IPaginationOptionsDTO,
    type: string,
  ): Promise<[Categories[], number]> {
    const where = {} as FindOptionsWhere<Categories>

    if (type) {
      where.type = type
    }

    const categories = await this.ormRepository.findAndCount({
      take: options.limit,
      skip: (options.page - 1) * options.limit,
      where,
    })

    return categories
  }

  public async All(): Promise<Categories[]> {
    const categories = await this.ormRepository.find()

    return categories
  }

  public async update(category: ICreateCategoriesDTO): Promise<Categories> {
    const categoryUpdate = await this.ormRepository.save(category)

    return categoryUpdate
  }

  public async save(category: Categories): Promise<Categories> {
    return this.ormRepository.save(category)
  }
}

export default CategoriesRepository
