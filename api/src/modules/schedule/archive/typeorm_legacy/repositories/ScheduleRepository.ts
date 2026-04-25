import { Between, Repository } from 'typeorm'
import dataSource from '@shared/infra/typeorm'

import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'
import Schedule from '../entities/Schedule'
import ICreateScheduleDTO from '@modules/schedule/dtos/ICreateScheduleDTO'
import IScheduleRepository from '@modules/schedule/repositories/IScheduleRepository'

class ScheduleRepository implements IScheduleRepository {
  private ormRepository: Repository<Schedule>

  constructor() {
    this.ormRepository = dataSource.getRepository(Schedule)
  }

  public async create(data: ICreateScheduleDTO): Promise<Schedule> {
    const created = this.ormRepository.create(data)

    await this.ormRepository.save(created)

    return created
  }

  public async findById(id: string): Promise<Schedule | null> {
    const found = await this.ormRepository.findOne({
      where: {
        id,
      },
    })

    return found
  }

  public async findByName(name: string): Promise<Schedule | null> {
    const found = await this.ormRepository.findOne({
      where: { name },
    })

    return found
  }

  public async delete(id: string): Promise<void> {
    const found = await this.ormRepository.findOne({
      where: {
        id,
      },
    })

    if (found) {
      this.ormRepository.remove(found)
    }
  }

  public async findAndCount(
    options: IPaginationOptionsDTO,
  ): Promise<[Schedule[], number]> {
    const found = await this.ormRepository.findAndCount({
      take: options.limit,
      skip: (options.page - 1) * options.limit,
      order: {
        updated_at: 'DESC',
        created_at: 'DESC',
      },
    })

    return found
  }

  public async findByProfessionalIdAndDates(
    professionalId: string,
    gte: Date,
    lte: Date,
  ): Promise<Schedule[]> {
    const founds = await this.ormRepository.find({
      where: {
        professional_id: professionalId,
        date: Between(new Date(gte), new Date(lte)),
      },
    })

    return founds
  }

  public async All(): Promise<Schedule[]> {
    const found = await this.ormRepository.find()

    return found
  }

  public async update(data: ICreateScheduleDTO): Promise<Schedule> {
    const found = await this.ormRepository.save(data)

    return found
  }

  public async save(data: Schedule): Promise<Schedule> {
    return this.ormRepository.save(data)
  }
}

export default ScheduleRepository
