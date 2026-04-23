import { injectable, inject } from 'tsyringe'

import IAddressRepository from '../repositories/IAddressRepository'
import Address from '../infra/typeorm/entities/Address'

import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'

@injectable()
class IndexAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute(
    options: IPaginationOptionsDTO,
  ): Promise<[Address[], number]> {
    const address = await this.addressRepository.findAndCount(options)

    return address
  }
}

export default IndexAddressService
