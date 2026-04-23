import { Repository } from 'typeorm'

import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'
import ICreateTimeIntervalsDTO from '@modules/users/dtos/ICreateTimeIntervalsDTO'
import TimeIntervals from '../entities/TimeIntervals'
import ITimeIntervalsRepository, {
  BlockedDates,
} from '@modules/users/repositories/ITimeIntervalsRepository'
import dataSource from '@shared/infra/typeorm'

class TimeIntervalsRepository implements ITimeIntervalsRepository {
  private ormRepository: Repository<TimeIntervals>

  constructor() {
    this.ormRepository = dataSource.getRepository(TimeIntervals)
  }

  public async create(data: ICreateTimeIntervalsDTO): Promise<TimeIntervals> {
    const timeInterval = this.ormRepository.create(data)

    await this.ormRepository.save(timeInterval)

    return timeInterval
  }

  public async findById(id: string): Promise<TimeIntervals | null> {
    const timeInterval = await this.ormRepository.findOne({
      where: {
        id,
      },
    })

    return timeInterval
  }

  public async findByProfessionalId(
    professionalId: string,
  ): Promise<TimeIntervals[]> {
    const timeIntervals = await this.ormRepository.find({
      where: {
        professional_id: professionalId,
      },
    })

    return timeIntervals
  }

  public async findByProfessionalAndWeekDay(
    professionalId: string,
    weekDay: number,
  ): Promise<TimeIntervals | null> {
    const timeIntervals = await this.ormRepository.findOne({
      where: {
        professional_id: professionalId,
        week_day: weekDay,
      },
    })

    return timeIntervals
  }

  public async findBlockedDatesRow(
    professionalId: string,
    year: string,
    month: string,
  ): Promise<BlockedDates[]> {
    const dates = await this.ormRepository.query(
      ` 
      select
        extract(day from ss.date) as date,
          COUNT(ss.date) as amount, 
          ((SUM(pti.time_end_in_minutes_one + pti.time_end_in_minutes_two) - SUM(pti.time_start_in_minutes_one + pti.time_start_in_minutes_two)) / 60)  as size   
      from
        sc100_schedulings ss 
      left join pr100_time_intervals pti 
            on
        pti.week_day = extract(isodow from date)   
      where
        ss.professional_id = '${professionalId}'
        and to_char(ss.date , 'yyyy-mm')  = '${year}-${month}'
      group by
        extract(day
      from
        ss.date),
        ((pti.time_end_in_minutes_one - pti.time_start_in_minutes_one) / 60)
      having
        COUNT(ss.date) >= ((SUM(pti.time_end_in_minutes_one + pti.time_end_in_minutes_two) - SUM(pti.time_start_in_minutes_one + pti.time_start_in_minutes_two)) / 60) 
      `,
    )

    return dates
  }

  public async findAndCount(
    options: IPaginationOptionsDTO,
  ): Promise<[TimeIntervals[], number]> {
    const timeIntervals = await this.ormRepository.findAndCount({
      take: options.limit,
      skip: (options.page - 1) * options.limit,
    })

    return timeIntervals
  }

  public async delete(id: string): Promise<void> {
    const timeInterval = await this.ormRepository.findOne({
      where: {
        id,
      },
    })

    if (timeInterval) {
      this.ormRepository.remove(timeInterval)
    }
  }

  public async save(data: TimeIntervals): Promise<TimeIntervals> {
    return this.ormRepository.save(data)
  }
}

export default TimeIntervalsRepository
