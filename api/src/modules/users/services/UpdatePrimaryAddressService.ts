import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import IAddressRepository from '../repositories/IAddressRepository'

import Address from '../infra/typeorm/entities/Address'

interface IRequest {
  addressId: string
  zipcode: string
  city: string
  state: string
  country: string
  neighborhood: string
  street: string
  streetNumber: string
}

@injectable()
class UpdatePrimaryAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute(addressId: string): Promise<void> {
    const addresses = await this.addressRepository.findAll()

    addresses.forEach(async (address) => {
      const newAddress = {
        ...address,
        primary: address.id === addressId,
      }
      await this.addressRepository.save(newAddress)
    })
  }
}

export default UpdatePrimaryAddressService
