import { Inject, Injectable } from '@nestjs/common'
import { IAddressRepository } from '../domain/repositories/address.repository.interface'

@Injectable()
export class ShowIsPrimaryAddressUseCase {
  constructor(
    @Inject('ADDRESS_REPOSITORY_TOKEN')
    private readonly addressRepository: IAddressRepository,
  ) {}

  public async execute(userId: string): Promise<boolean> {
    const primaryAddress = await this.addressRepository.findPrimaryByUserId(userId)
    return !!primaryAddress
  }
}
