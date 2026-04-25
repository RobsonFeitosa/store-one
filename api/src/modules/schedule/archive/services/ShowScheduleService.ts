import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import IScheduleRepository from '../repositories/IScheduleRepository'
import Schedule from '../infra/typeorm/entities/Schedule'

@injectable()
class ShowScheduleService {
  constructor(
    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository,
  ) {}

  public async execute(scheduleId: string): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findById(scheduleId)

    if (!schedule) throw new AppError('Schedule not found', 404)

    return schedule
  }
}

export default ShowScheduleService
