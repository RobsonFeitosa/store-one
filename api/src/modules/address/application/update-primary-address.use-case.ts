import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { IAddressRepository } from '../domain/repositories/address.repository.interface'

@Injectable()
export class UpdatePrimaryAddressUseCase {
  constructor(
    @Inject('ADDRESS_REPOSITORY_TOKEN')
    private readonly addressRepository: IAddressRepository,
  ) {}

  public async execute(addressId: string): Promise<void> {
    const address = await this.addressRepository.findById(addressId)

    if (!address) {
      throw new NotFoundException('Address not found')
    }

    await this.addressRepository.clearPrimary(address.user_id)

    address.primary = true
    await this.addressRepository.save(address)
  }
}
