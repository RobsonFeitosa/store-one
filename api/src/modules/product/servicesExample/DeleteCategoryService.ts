import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import ICategoriesRepository from '../repositories/ICategoriesRepository'

@injectable()
class DeleteAddressCustomerService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const category = await this.categoriesRepository.findById(id)

    if (!category) {
      throw new AppError('Category not exist')
    }

    await this.categoriesRepository.delete(id)
  }
}

export default DeleteAddressCustomerService
