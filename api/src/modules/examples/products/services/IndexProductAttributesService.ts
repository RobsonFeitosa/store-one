import { inject, injectable } from 'tsyringe'
import ProductAttributes from '../infra/typeorm/entities/ProductAttributes'

import IProductAttributesRepository from '../repositories/IProductAttributesRepository'
import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'

@injectable()
class IndexProductAttributesService {
  constructor(
    @inject('ProductAttributesRepository')
    private productAttributesRepository: IProductAttributesRepository,
  ) {}

  public async execute(
    options: IPaginationOptionsDTO,
    productId: string,
  ): Promise<[ProductAttributes[], number]> {
    const productAttr = await this.productAttributesRepository.findAndCount(
      options,
      productId,
    )

    return productAttr
  }
}

export default IndexProductAttributesService
