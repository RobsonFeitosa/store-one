import { inject, injectable } from 'tsyringe'
import { uuid } from 'uuidv4'

import AppError from '@shared/errors/AppError'

import slug from 'slug'
import Product from '../infra/typeorm/entities/Product'
import IProductsRepository from '../repositories/IProductsRepository'

import IProductDataRepository from '../repositories/IProductDataRepository'
import IProductAttributesRepository from '../repositories/IProductAttributesRepository'
import ProductAttributes from '../infra/typeorm/entities/ProductAttributes'
import ICreateProductDataDTO from '../dtos/ICreateProductDataDTO'
import CreateProductDTO from '../dtos/ICreateProductDTO'
import ICategoriesRepository from '../repositories/ICategoriesRepository'
import ProductVariations from '../infra/typeorm/entities/ProductVariations'
import IProductVariationsRespository from '../repositories/IProductVariationsRespository'

interface AttributesWithVariations
  extends Omit<ProductAttributes, 'variations'> {
  variations: ProductVariations[]
}

export interface RequestProps extends Omit<CreateProductDTO, 'categories'> {
  product_data?: ICreateProductDataDTO
  attributes?: AttributesWithVariations[]
  categories: string[]
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('ProductDataRepository')
    private productDataRepository: IProductDataRepository,

    @inject('ProductAttributesRepository')
    private productAttributesRepository: IProductAttributesRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('ProductVariationsRespository')
    private productVariationsRespository: IProductVariationsRespository,
  ) {}

  public async execute(data: RequestProps): Promise<Product> {
    const { product_data, attributes, type = 'product', ...rest } = data
    const checkProductExist = await this.productsRepository.findByName(
      rest.name,
    )

    if (checkProductExist) {
      throw new AppError('Product item already used.')
    }

    if (rest.old_price && rest.price) {
      if (rest.old_price <= rest.price) {
        throw new AppError('the value must be less than the discount price')
      }
    }

    if (rest.categories) {
      for (const categoryId of rest.categories) {
        const category = await this.categoriesRepository.findById(categoryId)

        if (!category) {
          throw new AppError('Category not found.')
        }
      }
    }

    const product = await this.productsRepository.create({
      ...rest,
      type,
      cod_product: uuid(),
      categories: JSON.stringify(rest.categories),
      slug: slug(data.name),
    })

    if (product_data) {
      const productData = await this.productDataRepository.create({
        ...product_data,
        product_id: product.id,
      })

      product.product_data = productData
    }

    const createAttrs: ProductAttributes[] = []
    if (attributes) {
      for (const productAttr of attributes) {
        productAttr.product_id = product.id

        const { variations, ...rest } = productAttr

        const createAttr = await this.productAttributesRepository.create(rest)

        createAttrs.push(createAttr)

        const createVariations: ProductVariations[] = []
        for (const variation of variations) {
          const createVar = await this.productVariationsRespository.create({
            ...variation,
            product_attr_id: createAttr.id,
          })

          createVariations.push(createVar)
        }

        createAttr.variations = createVariations
      }
      product.attributes = createAttrs
    }

    return product
  }
}

export default CreateProductService
