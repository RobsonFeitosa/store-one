import { inject, injectable } from 'tsyringe'
import ICreateProductProviderDTO from '../dtos/ICreateProductProviderDTO'
import IProductProviderRepository from '../repositories/IProductProviderRepository'
import ProductProvider from '../infra/typeorm/entities/ProductProvider'

@injectable()
class CreateProvidersService {
  constructor(
    @inject('ProductProviderRepository')
    private productProviderRepository: IProductProviderRepository,
  ) {}

  public async execute(
    payload: ICreateProductProviderDTO,
  ): Promise<ProductProvider> {
    const provider = await this.productProviderRepository.create(payload)

    return provider
  }
}

export default CreateProvidersService
