import { inject, injectable } from 'tsyringe'

import ICreateScheduleDTO from '../dtos/ICreateScheduleDTO'
import IScheduleRepository from '../repositories/IScheduleRepository'
import Schedule from '../infra/typeorm/entities/Schedule'

@injectable()
class CreateScheduleService {
  constructor(
    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository,
  ) {}

  public async execute(payload: ICreateScheduleDTO): Promise<Schedule> {
    const schedule = await this.scheduleRepository.create(payload)

    return schedule
  }
}

export default CreateScheduleService
