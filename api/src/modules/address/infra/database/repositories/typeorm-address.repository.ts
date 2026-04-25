import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Address } from '../../../domain/entities/address.entity'
import { IAddressRepository } from '../../../domain/repositories/address.repository.interface'

@Injectable()
export class TypeOrmAddressRepository implements IAddressRepository {
  constructor(private readonly ormRepository: Repository<Address>) {}

  public async create(data: Partial<Address>): Promise<Address> {
    const address = this.ormRepository.create(data)
    return this.ormRepository.save(address)
  }

  public async save(address: Address): Promise<Address> {
    return this.ormRepository.save(address)
  }

  public async findById(id: string): Promise<Address | null> {
    return this.ormRepository.findOne({ where: { id } })
  }

  public async findByUserId(userId: string): Promise<Address[]> {
    return this.ormRepository.find({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
    })
  }

  public async findPrimaryByUserId(userId: string): Promise<Address | null> {
    return this.ormRepository.findOne({
      where: { user_id: userId, primary: true },
    })
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }

  public async findAll(
    page: number,
    limit: number,
  ): Promise<[Address[], number]> {
    return this.ormRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: 'DESC' },
    })
  }

  public async clearPrimary(userId: string): Promise<void> {
    await this.ormRepository.update({ user_id: userId }, { primary: false })
  }
}
