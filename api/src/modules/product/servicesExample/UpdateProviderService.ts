import { inject, injectable } from 'tsyringe'
import ICreateProductProviderDTO from '../dtos/ICreateProductProviderDTO'
import IProductProviderRepository from '../repositories/IProductProviderRepository'
import ProductProvider from '../infra/typeorm/entities/ProductProvider'
import AppError from '@shared/errors/AppError'

@injectable()
class UpdateProviderService {
  constructor(
    @inject('ProductProviderRepository')
    private productProviderRepository: IProductProviderRepository,
  ) {}

  public async execute(
    payload: ICreateProductProviderDTO,
    providerId: string,
  ): Promise<ProductProvider> {
    const provider = await this.productProviderRepository.findById(providerId)

    if (!provider) {
      throw new AppError('Provider not found')
    }

    provider.name = payload.name
    provider.address = payload.address
    provider.email = payload.email
    provider.phone1 = payload.phone1
    provider.phone2 = payload.phone2

    await this.productProviderRepository.save(provider)

    return provider
  }
}

export default UpdateProviderService
