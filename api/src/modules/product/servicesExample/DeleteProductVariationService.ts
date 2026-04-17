import AppError from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'

import IProductAttributesRepository from '../repositories/IProductAttributesRepository'
import IProductsRepository from '../repositories/IProductsRepository'
import IProductVariationsRespository from '../repositories/IProductVariationsRespository'

interface Option {
  label: string
  value: string
}

@injectable()
class DeleteProductVariationService {
  constructor(
    @inject('ProductVariationsRespository')
    private productVariationsRespository: IProductVariationsRespository,

    @inject('ProductAttributesRepository')
    private productAttributesRepository: IProductAttributesRepository,
  ) {}

  public async execute(
    variationId: string,
    attributeId: string,
  ): Promise<void> {
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

    attribute.options = JSON.stringify(
      attribute.optionsParse.filter(
        (option: Option) => option.value !== variation.name,
      ),
    )

    await this.productAttributesRepository.save(attribute)

    await this.productVariationsRespository.delete(variation.id)
  }
}

export default DeleteProductVariationService
