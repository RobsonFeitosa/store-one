import { Inject, Injectable } from '@nestjs/common'
import { IAddressRepository } from '../domain/repositories/address.repository.interface'
import { Address } from '../domain/entities/address.entity'

interface CreateAddressRequest {
  title: string
  user_id: string
  zipcode: string
  city: string
  state: string
  country: string
  neighborhood: string
  street: string
  street_number: string
  primary: boolean
}

@Injectable()
export class CreateAddressUseCase {
  constructor(
    @Inject('ADDRESS_REPOSITORY_TOKEN')
    private readonly addressRepository: IAddressRepository,
  ) {}

  public async execute(data: CreateAddressRequest): Promise<Address> {
    if (data.primary) {
      await this.addressRepository.clearPrimary(data.user_id)
    }

    return this.addressRepository.create(data)
  }
}
