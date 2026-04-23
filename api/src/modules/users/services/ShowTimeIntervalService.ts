import { injectable, inject } from 'tsyringe'

import TimeIntervals from '../infra/typeorm/entities/TimeIntervals'
import ITimeIntervalsRepository from '../repositories/ITimeIntervalsRepository'
import AppError from '@shared/errors/AppError'

@injectable()
class ShowTimeIntervalService {
  constructor(
    @inject('TimeIntervalsRepository')
    private timeIntervalsRepository: ITimeIntervalsRepository,
  ) {}

  public async execute(timeIntervalId: string): Promise<TimeIntervals> {
    const timeIntervals =
      await this.timeIntervalsRepository.findById(timeIntervalId)

    if (!timeIntervals) throw new AppError('Time interval not found')

    return timeIntervals
  }
}

export default ShowTimeIntervalService
