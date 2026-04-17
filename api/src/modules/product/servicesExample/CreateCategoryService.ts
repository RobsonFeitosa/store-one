import { inject, injectable } from 'tsyringe'

import Category from '../infra/typeorm/entities/ProductCategory'
import ICategoriesRepository from '../repositories/ICategoriesRepository'

interface IRequest {
  name: string
  parent_id?: string
  type: string
}

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ name, parent_id, type }: IRequest): Promise<Category> {
    let lvlCount = 0

    if (parent_id !== undefined) {
      const category = await this.categoriesRepository.findById(parent_id)

      if (category && parent_id !== null) {
        lvlCount = Number(category?.level) + 1
      }
    }

    const categoryResponse = await this.categoriesRepository.create({
      name,
      type,
      parent_id,
      level: lvlCount,
    })

    return categoryResponse
  }
}

export default CreateCategoryService
