import { injectable, inject } from 'tsyringe'

import TimeIntervals from '../infra/typeorm/entities/TimeIntervals'
import ITimeIntervalsRepository from '../repositories/ITimeIntervalsRepository'
import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'

@injectable()
class IndexTimeIntervalsService {
  constructor(
    @inject('TimeIntervalsRepository')
    private timeIntervalsRepository: ITimeIntervalsRepository,
  ) {}

  public async execute(
    options: IPaginationOptionsDTO,
  ): Promise<[TimeIntervals[], number]> {
    const timeIntervals =
      await this.timeIntervalsRepository.findAndCount(options)

    return timeIntervals
  }
}

export default IndexTimeIntervalsService
