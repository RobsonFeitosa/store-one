import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { IAddressRepository } from '../domain/repositories/address.repository.interface'
import { Address } from '../domain/entities/address.entity'

interface UpdateAddressRequest {
  addressId: string
  zipcode: string
  city: string
  state: string
  userId: string
  title: string
  country: string
  neighborhood: string
  primary: boolean
  street: string
  streetNumber: string
}

@Injectable()
export class UpdateAddressUseCase {
  constructor(
    @Inject('ADDRESS_REPOSITORY_TOKEN')
    private readonly addressRepository: IAddressRepository,
  ) {}

  public async execute({
    addressId,
    zipcode,
    city,
    state,
    country,
    title,
    userId,
    primary,
    neighborhood,
    street,
    streetNumber,
  }: UpdateAddressRequest): Promise<Address> {
    const address = await this.addressRepository.findById(addressId)

    if (!address) {
      throw new NotFoundException('Address not found')
    }

    if (primary) {
      await this.addressRepository.clearPrimary(userId)
    }

    Object.assign(address, {
      zipcode,
      title,
      city,
      state,
      country,
      neighborhood,
      street,
      street_number: streetNumber,
      primary,
    })

    return this.addressRepository.save(address)
  }
}
