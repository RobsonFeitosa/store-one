import { Address } from '../entities/address.entity'

export interface IAddressRepository {
  create(data: Partial<Address>): Promise<Address>
  save(address: Address): Promise<Address>
  findById(id: string): Promise<Address | null>
  findByUserId(userId: string): Promise<Address[]>
  findPrimaryByUserId(userId: string): Promise<Address | null>
  delete(id: string): Promise<void>
  findAll(page: number, limit: number): Promise<[Address[], number]>
  clearPrimary(userId: string): Promise<void>
}
