import { Inject, Injectable } from '@nestjs/common'
import { IAddressRepository } from '../domain/repositories/address.repository.interface'
import { Address } from '../domain/entities/address.entity'

interface IndexAddressRequest {
  page: number
  limit: number
}

@Injectable()
export class IndexAddressUseCase {
  constructor(
    @Inject('ADDRESS_REPOSITORY_TOKEN')
    private readonly addressRepository: IAddressRepository,
  ) {}

  public async execute({
    page,
    limit,
  }: IndexAddressRequest): Promise<[Address[], number]> {
    return this.addressRepository.findAll(page, limit)
  }
}
