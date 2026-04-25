import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { IAddressRepository } from '../domain/repositories/address.repository.interface'

@Injectable()
export class DeleteAddressUseCase {
  constructor(
    @Inject('ADDRESS_REPOSITORY_TOKEN')
    private readonly addressRepository: IAddressRepository,
  ) {}

  public async execute(addressId: string): Promise<void> {
    const address = await this.addressRepository.findById(addressId)

    if (!address) {
      throw new NotFoundException('Address not found')
    }

    await this.addressRepository.delete(addressId)
  }
}
