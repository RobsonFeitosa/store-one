import { Between, Repository } from 'typeorm'
import { ISchedulingRepository } from 'src/modules/schedule/domain/repositories/scheduling.repository.interface'
import { Scheduling } from 'src/modules/schedule/domain/entities/scheduling.entity'
import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'

export class TypeOrmSchedulingRepository implements ISchedulingRepository {
  constructor(private ormRepository: Repository<Scheduling>) {}

  public async create(data: Partial<Scheduling>): Promise<Scheduling> {
    const scheduling = this.ormRepository.create(data)
    return await this.ormRepository.save(scheduling)
  }

  public async findById(id: string): Promise<Scheduling | null> {
    return await this.ormRepository.findOne({
      where: { id },
    })
  }

  public async findByName(name: string): Promise<Scheduling | null> {
    return await this.ormRepository.findOne({
      where: { name },
    })
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }

  public async findAndCount(
    options: IPaginationOptionsDTO,
  ): Promise<[Scheduling[], number]> {
    return await this.ormRepository.findAndCount({
      take: options.limit,
      skip: (options.page - 1) * options.limit,
      order: {
        updated_at: 'DESC',
        created_at: 'DESC',
      },
    })
  }

  public async findByProfessionalIdAndDates(
    professionalId: string,
    gte: Date,
    lte: Date,
  ): Promise<Scheduling[]> {
    return await this.ormRepository.find({
      where: {
        professional_id: professionalId,
        date: Between(new Date(gte), new Date(lte)),
      },
    })
  }

  public async findAll(): Promise<Scheduling[]> {
    return await this.ormRepository.find()
  }

  public async save(data: Scheduling): Promise<Scheduling> {
    return await this.ormRepository.save(data)
  }
}
