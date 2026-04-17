import { inject, injectable } from 'tsyringe'
import slug from 'slug'

import AppError from '@shared/errors/AppError'

import Product from '../infra/typeorm/entities/Product'
import IProductsRepository from '../repositories/IProductsRepository'
import ICategoriesRepository from '../repositories/ICategoriesRepository'
import IProductDataRepository from '../repositories/IProductDataRepository'
import IProductAttributesRepository from '../repositories/IProductAttributesRepository'
import CreateProductDTO from '../dtos/ICreateProductDTO'
import ICreateProductDataDTO, {
  IDimensionsDTO,
} from '../dtos/ICreateProductDataDTO'
import ProductAttributes from '../infra/typeorm/entities/ProductAttributes'
import ProductData from '../infra/typeorm/entities/ProductData'
import ICreateProductAttributesDTO from '../dtos/ICreateProductAttributesDTO'
import IProductVariationsRespository from '../repositories/IProductVariationsRespository'
import ProductVariations from '../infra/typeorm/entities/ProductVariations'

interface AttributesWithVariations
  extends Omit<ProductAttributes, 'variations'> {
  variations: ProductVariations[]
}

export interface RequestProps extends Omit<CreateProductDTO, 'categories'> {
  productId: string
  product_data?: ProductData | ICreateProductDataDTO
  attributes?: AttributesWithVariations[]
  categories?: string[]
}

@injectable()
class UpdateProductService {
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

  public async execute(payload: RequestProps): Promise<Product> {
    const { productId, ...rest } = payload

    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new AppError('This product does not exist')
    }

    if (payload.categories) {
      const { categories } = payload

      for (const categoryId of categories) {
        const category = await this.categoriesRepository.findById(categoryId)

        if (!category) {
          throw new AppError('Category not found.')
        }
      }
    }

    if (payload.product_data) {
      const { product_data } = payload

      if ((product_data as ProductData).id) {
        const productData = await this.productDataRepository.findById(
          product.product_data.id,
        )

        if (!productData) {
          throw new AppError('Product settings not found.')
        }

        productData.quantity = product_data.quantity
        productData.sku = product_data.sku
        productData.weight = product_data.weight
        productData.code_bar = product_data.code_bar
        productData.dimensions = JSON.stringify(product_data.dimensions)

        await this.productDataRepository.save(productData)
      } else {
        const productData = await this.productDataRepository.create({
          code_bar: product_data.code_bar,
          dimensions: product_data.dimensions as IDimensionsDTO,
          quantity: product_data.quantity,
          sku: product_data.sku,
          weight: product_data.weight,
          product_id: product.id,
        })

        product.product_data = productData
      }
    }

    if (payload.attributes) {
      const { attributes } = payload
      const newAttributes: ProductAttributes[] = []
      for (const attribute of attributes) {
        const attributeIdSaved = attribute.id

        if (attributeIdSaved) {
          const attr =
            await this.productAttributesRepository.findById(attributeIdSaved)

          if (!attr) {
            throw new AppError('Attribute not found.')
          }

          attr.name = attribute.name
          attr.options = JSON.stringify(attribute.options)

          await this.productAttributesRepository.save(attr)

          if (attr.variations) {
            // const newVariations: ProductVariations[] = []
            for (const variation of attribute.variations) {
              if (variation.id) {
                const varr = await this.productVariationsRespository.findById(
                  variation.id,
                )

                if (varr) {
                  varr.name = variation.name
                  varr.quantity = variation.quantity
                  varr.sku = variation.sku
                  varr.weight = variation.weight
                  varr.actived = variation.actived
                  varr.time = variation.time
                  varr.dimensions = JSON.stringify(variation.dimensions)

                  // newVariations.push(varr)

                  await this.productVariationsRespository.save(varr)
                }
              } else {
                const newVar =
                  await this.productVariationsRespository.create(variation)
                // newVariations.push(newVar)

                attr.variations.push(newVar)
              }
            }

            // attr.variations = newVariations
          }
          newAttributes.push(attr)
        } else {
          attribute.product_id = product.id

          const { variations, ...rest } = attribute

          const attributeSaved =
            await this.productAttributesRepository.create(rest)

          if (attributeSaved) {
            const newVariations: ProductVariations[] = []
            for (const variation of variations) {
              variation.product_attr_id = attributeSaved.id

              const varr =
                await this.productVariationsRespository.create(variation)

              if (varr) {
                newVariations.push(varr)
              }
            }
            attribute.variations = newVariations
            newAttributes.push(attributeSaved)
          }
        }
      }
      product.attributes = newAttributes
    }

    product.name = rest.name
    product.price = rest.price
    product.visibility = rest.visibility
    product.published = rest.published
    product.emphasis = rest.emphasis
    product.slug = slug(rest.name)
    if (rest.old_price) product.old_price = rest.old_price
    product.cod_product = rest.cod_product
    product.mode_data = rest.mode_data
    product.description = rest.description
    product.short_description = rest.short_description
    product.categories = JSON.stringify(payload.categories)

    await this.productsRepository.save(product)

    return product
  }
}

export default UpdateProductService
