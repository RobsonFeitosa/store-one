import { inject, injectable } from 'tsyringe'
import ProductVariations from '../infra/typeorm/entities/ProductVariations'
import IProductVariationsRespository from '../repositories/IProductVariationsRespository'
import IProductAttributesRepository from '../repositories/IProductAttributesRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  attributeId: string
  variationId: string
}

@injectable()
class ShowProductVariationService {
  constructor(
    @inject('ProductVariationsRespository')
    private productVariationsRespository: IProductVariationsRespository,

    @inject('ProductAttributesRepository')
    private productAttributesRepository: IProductAttributesRepository,
  ) {}

  public async execute({
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

    return variation
  }
}

export default ShowProductVariationService
