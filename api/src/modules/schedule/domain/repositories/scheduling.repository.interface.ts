import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'
import { Scheduling } from '../entities/scheduling.entity'

export interface ISchedulingRepository {
  create(data: Partial<Scheduling>): Promise<Scheduling>
  findById(id: string): Promise<Scheduling | null>
  findByName(name: string): Promise<Scheduling | null>
  findByProfessionalIdAndDates(
    professionalId: string,
    gte: Date,
    lte: Date,
  ): Promise<Scheduling[]>
  delete(id: string): Promise<void>
  findAndCount(options: IPaginationOptionsDTO): Promise<[Scheduling[], number]>
  save(data: Scheduling): Promise<Scheduling>
  findAll(): Promise<Scheduling[]>
}
