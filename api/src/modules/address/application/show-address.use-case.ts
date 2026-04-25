import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { IAddressRepository } from '../domain/repositories/address.repository.interface'
import { Address } from '../domain/entities/address.entity'

@Injectable()
export class ShowAddressUseCase {
  constructor(
    @Inject('ADDRESS_REPOSITORY_TOKEN')
    private readonly addressRepository: IAddressRepository,
  ) {}

  public async execute(userId: string): Promise<Address[]> {
    const addresses = await this.addressRepository.findByUserId(userId)

    if (!addresses) {
      throw new NotFoundException('Addresses not found')
    }

    return addresses
  }
}
