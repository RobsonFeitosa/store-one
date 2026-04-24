import { In, Repository } from 'typeorm'
import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'
import dataSource from '@shared/infra/typeorm'
import ITimeDiscountRepository from '@modules/products/repositories/ITimeDiscountRepository'
import TimeDiscount from '../entities/TimeDiscount'
import { ICreateTimeDiscountDTO } from '@modules/products/dtos/ICreateTimeDiscountDTO'

class TimeDiscountRepository implements ITimeDiscountRepository {
  private ormRepository: Repository<TimeDiscount>

  constructor() {
    this.ormRepository = dataSource.getRepository(TimeDiscount)
  }

  public async create(data: ICreateTimeDiscountDTO): Promise<TimeDiscount> {
    const created = this.ormRepository.create(data)

    const timeDiscount = await this.ormRepository.save(created)

    return timeDiscount
  }

  public async findAndCount(
    options: IPaginationOptionsDTO,
  ): Promise<[TimeDiscount[], number]> {
    const timeDiscounts = await this.ormRepository.findAndCount({
      take: options.limit,
      skip: (options.page - 1) * options.limit,
      order: {
        created_at: 'DESC',
      },
      relations: ['products'],
    })

    return timeDiscounts
  }

  public async findByAllAvailable(): Promise<TimeDiscount[]> {
    const timeDiscounts = await this.ormRepository.find({
      where: {
        status: In(['actived', 'complete']),
      },
    })

    return timeDiscounts
  }

  public async findById(id: string): Promise<TimeDiscount | null> {
    const timeDiscount = await this.ormRepository.findOne({
      where: {
        id,
      },
    })

    return timeDiscount
  }

  public async delete(id: string): Promise<void> {
    const timeDiscount = await this.ormRepository.findOne({
      where: {
        id,
      },
    })

    if (timeDiscount) {
      this.ormRepository.remove(timeDiscount)
    }
  }

  public async All(): Promise<TimeDiscount[]> {
    const timeDiscount = await this.ormRepository.find()

    return timeDiscount
  }

  public async save(data: TimeDiscount): Promise<TimeDiscount> {
    return this.ormRepository.save(data)
  }
}

export default TimeDiscountRepository
