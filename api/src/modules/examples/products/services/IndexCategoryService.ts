import { injectable, inject } from 'tsyringe'

import Category from '../infra/typeorm/entities/ProductCategory'
import ICategoriesRepository from '../repositories/ICategoriesRepository'
import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'

@injectable()
class IndexCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(
    options: IPaginationOptionsDTO,
    type: string,
  ): Promise<[Category[], number]> {
    const categories = await this.categoriesRepository.findAndCount(
      options,
      type,
    )

    return categories
  }
}

export default IndexCategoryService
