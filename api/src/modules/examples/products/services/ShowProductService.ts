import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import Product from '../infra/typeorm/entities/Product'
import IProductsRepository from '../repositories/IProductsRepository'
import ICategoriesRepository from '../repositories/ICategoriesRepository'
import Categories from '../infra/typeorm/entities/ProductCategory'

@injectable()
class IndexProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(slug: string, product_id: string): Promise<Product> {
    const product = await this.productsRepository.findBySlugAndId(
      slug,
      product_id,
    )

    if (!product) {
      throw new AppError('Product does not found')
    }

    const categories: Categories[] = []

    if (product.categories) {
      for (const categoryId of JSON.parse(product.categories)) {
        const category = await this.categoriesRepository.findById(categoryId)

        if (category) {
          categories.push(category)
        }
      }

      product.categories_items = categories
    }

    return product
  }
}

export default IndexProductsService
