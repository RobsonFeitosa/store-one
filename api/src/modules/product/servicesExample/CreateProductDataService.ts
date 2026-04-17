import { inject, injectable } from 'tsyringe'
import ProductData from '../infra/typeorm/entities/ProductData'

import ICreateProductDataDTO from '../dtos/ICreateProductDataDTO'
import IProductsRepository from '../repositories/IProductsRepository'
import AppError from '@shared/errors/AppError'
import IProductDataRepository from '../repositories/IProductDataRepository'

interface RequestProps {
  productId: string
  payload: ICreateProductDataDTO
}

@injectable()
class CreateProductDataService {
  constructor(
    @inject('ProductDataRepository')
    private productDataRepository: IProductDataRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: RequestProps): Promise<ProductData> {
    const { payload, productId } = data

    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new AppError('Product not found')
    }

    const productData = await this.productDataRepository.create({
      ...payload,
      product_id: productId,
    })

    product.product_data = productData

    await this.productsRepository.save(product)

    return productData
  }
}

export default CreateProductDataService
