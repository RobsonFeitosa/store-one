import { inject, injectable } from 'tsyringe'
import IProductProviderRepository from '../repositories/IProductProviderRepository'
import AppError from '@shared/errors/AppError'

@injectable()
class DeleteProviderService {
  constructor(
    @inject('ProductProviderRepository')
    private productProviderRepository: IProductProviderRepository,
  ) {}

  public async execute(providerId: string): Promise<void> {
    const provider = await this.productProviderRepository.findById(providerId)

    if (!provider) {
      throw new AppError('Provider not found')
    }

    await this.productProviderRepository.delete(provider.id)
  }
}

export default DeleteProviderService
