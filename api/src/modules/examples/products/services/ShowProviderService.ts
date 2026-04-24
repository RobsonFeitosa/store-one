import { inject, injectable } from 'tsyringe'
import IProductProviderRepository from '../repositories/IProductProviderRepository'
import ProductProvider from '../infra/typeorm/entities/ProductProvider'
import AppError from '@shared/errors/AppError'

@injectable()
class ShowProviderService {
  constructor(
    @inject('ProductProviderRepository')
    private productProviderRepository: IProductProviderRepository,
  ) {}

  public async execute(providerId: string): Promise<ProductProvider> {
    const provider = await this.productProviderRepository.findById(providerId)

    if (!provider) {
      throw new AppError('Provider not found')
    }

    return provider
  }
}

export default ShowProviderService
