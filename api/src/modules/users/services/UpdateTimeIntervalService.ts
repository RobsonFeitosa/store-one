import { injectable, inject } from 'tsyringe'

import TimeIntervals from '../infra/typeorm/entities/TimeIntervals'
import ITimeIntervalsRepository from '../repositories/ITimeIntervalsRepository'
import ICreateTimeIntervalsDTO from '../dtos/ICreateTimeIntervalsDTO'

@injectable()
class UpdateTimeIntervalService {
  constructor(
    @inject('TimeIntervalsRepository')
    private timeIntervalsRepository: ITimeIntervalsRepository,
  ) {}

  public async execute(
    data: ICreateTimeIntervalsDTO[],
    professionalId: string,
  ): Promise<TimeIntervals[]> {
    const timeIntervals =
      await this.timeIntervalsRepository.findByProfessionalId(professionalId)

    console.log({ timeIntervals })
    for (const timeInterval of timeIntervals) {
      await this.timeIntervalsRepository.delete(timeInterval.id)
    }

    return Promise.all(
      data.map((interval) => {
        return this.timeIntervalsRepository.create({
          week_day: interval.week_day,
          time_end_in_minutes_one: interval.time_end_in_minutes_one,
          time_start_in_minutes_one: interval.time_start_in_minutes_one,
          time_end_in_minutes_two: interval.time_end_in_minutes_two,
          time_start_in_minutes_two: interval.time_start_in_minutes_two,
          professional_id: interval.professional_id,
        })
      }),
    )
  }
}

export default UpdateTimeIntervalService
