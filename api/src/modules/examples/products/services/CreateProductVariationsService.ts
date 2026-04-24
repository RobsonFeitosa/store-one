import { inject, injectable } from 'tsyringe'
import ProductVariations from '../infra/typeorm/entities/ProductVariations'
import { ICreateProductVariationsDTO } from '../dtos/ICreateProductVariationsDTO'
import IProductVariationsRespository from '../repositories/IProductVariationsRespository'

interface IRequest {
  payload: ICreateProductVariationsDTO
  attributeId: string
}

@injectable()
class CreateProductVariationsService {
  constructor(
    @inject('ProductVariationsRespository')
    private productVariationsRespository: IProductVariationsRespository,
  ) {}

  public async execute({
    payload,
    attributeId,
  }: IRequest): Promise<ProductVariations> {
    const productVariations = await this.productVariationsRespository.create({
      ...payload,
      product_attr_id: attributeId,
    })

    return productVariations
  }
}

export default CreateProductVariationsService
