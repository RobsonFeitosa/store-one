import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Category from '../infra/typeorm/entities/ProductCategory'

import ICategoriesRepository from '../repositories/ICategoriesRepository'

interface IRequest {
  category_id: string
  name: string
  parent_id?: string
  level?: string
}

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    category_id,
    name,
    parent_id,
    level,
  }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.findById(category_id)

    if (!category) {
      throw new AppError('This category does not exist')
    }

    category.name = name
    if (level !== undefined) category.level = level

    await this.categoriesRepository.update(category)

    return category
  }
}

export default UpdateCategoryService
