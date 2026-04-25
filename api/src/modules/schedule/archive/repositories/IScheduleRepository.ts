import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'
import ICreateScheduleDTO from '../dtos/ICreateScheduleDTO'
import Schedule from '../infra/typeorm/entities/Schedule'

export default interface IScheduleRepository {
  create(data: ICreateScheduleDTO): Promise<Schedule>
  findById(id: string): Promise<Schedule | null>
  findByName(name: string): Promise<Schedule | null>
  findByProfessionalIdAndDates(
    professionalId: string,
    gte: Date,
    lte: Date,
  ): Promise<Schedule[]>
  delete(id: string): Promise<void>
  findAndCount(options: IPaginationOptionsDTO): Promise<[Schedule[], number]>
  update(data: ICreateScheduleDTO): Promise<Schedule>
  save(data: Schedule): Promise<Schedule>
  All(): Promise<Schedule[]>
}
