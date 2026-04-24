import { inject, injectable } from 'tsyringe'
import IProductProviderRepository from '../repositories/IProductProviderRepository'
import ProductProvider from '../infra/typeorm/entities/ProductProvider'
import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'

@injectable()
class IndexProvidersService {
  constructor(
    @inject('ProductProviderRepository')
    private productProviderRepository: IProductProviderRepository,
  ) {}

  public async execute(
    options: IPaginationOptionsDTO,
  ): Promise<[ProductProvider[], number]> {
    const providers = await this.productProviderRepository.findAndCount(options)

    return providers
  }
}

export default IndexProvidersService
