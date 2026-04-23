import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'
import ICreateTimeIntervalsDTO from '../dtos/ICreateTimeIntervalsDTO'
import TimeIntervals from '../infra/typeorm/entities/TimeIntervals'

export interface BlockedDates {
  date: string
  amount: string
  size: number
}

export default interface ITimeIntervalsRepository {
  create(data: ICreateTimeIntervalsDTO): Promise<TimeIntervals>
  findById(id: string): Promise<TimeIntervals | null>
  findBlockedDatesRow(
    professionalId: string,
    year: string,
    month: string,
  ): Promise<BlockedDates[]>
  findByProfessionalAndWeekDay(
    professionalId: string,
    weekDay: number,
  ): Promise<TimeIntervals | null>
  findByProfessionalId(professionalId: string): Promise<TimeIntervals[]>
  findAndCount(
    options: IPaginationOptionsDTO,
  ): Promise<[TimeIntervals[], number]>
  delete(id: string): Promise<void>
  save(data: TimeIntervals): Promise<TimeIntervals>
}
