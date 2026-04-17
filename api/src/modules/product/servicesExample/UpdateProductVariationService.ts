import { inject, injectable } from 'tsyringe'
import ProductVariations from '../infra/typeorm/entities/ProductVariations'
import { ICreateProductVariationsDTO } from '../dtos/ICreateProductVariationsDTO'
import IProductVariationsRespository from '../repositories/IProductVariationsRespository'
import AppError from '@shared/errors/AppError'
import IProductAttributesRepository from '../repositories/IProductAttributesRepository'

interface IRequest {
  payload: ICreateProductVariationsDTO
  attributeId: string
  variationId: string
}

@injectable()
class UpdateProductVariationService {
  constructor(
    @inject('ProductVariationsRespository')
    private productVariationsRespository: IProductVariationsRespository,

    @inject('ProductAttributesRepository')
    private productAttributesRepository: IProductAttributesRepository,
  ) {}

  public async execute({
    payload,
    attributeId,
    variationId,
  }: IRequest): Promise<ProductVariations> {
    const attribute =
      await this.productAttributesRepository.findById(attributeId)

    if (!attribute) {
      throw new AppError('Attribute not found')
    }

    const variation =
      await this.productVariationsRespository.findById(variationId)

    if (!variation) {
      throw new AppError('Variation not found')
    }

    variation.actived = payload.actived
    variation.dimensions = JSON.stringify(payload.dimensions)
    variation.name = payload.name
    variation.sku = payload.sku
    variation.price = payload.price
    variation.quantity = payload.quantity
    variation.weight = payload.weight

    await this.productVariationsRespository.save(variation)

    return variation
  }
}

export default UpdateProductVariationService
