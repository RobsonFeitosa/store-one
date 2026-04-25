import { injectable, inject } from 'tsyringe'

import IScheduleRepository from '../repositories/IScheduleRepository'
import Schedule from '../infra/typeorm/entities/Schedule'
import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'

@injectable()
class IndexScheduleService {
  constructor(
    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository,
  ) {}

  public async execute(
    options: IPaginationOptionsDTO,
  ): Promise<[Schedule[], number]> {
    const schedules = await this.scheduleRepository.findAndCount(options)

    return schedules
  }
}

export default IndexScheduleService
