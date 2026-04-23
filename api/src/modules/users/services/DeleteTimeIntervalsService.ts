import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import ITimeIntervalsRepository from '../repositories/ITimeIntervalsRepository'

@injectable()
class DeleteTimeIntervalsService {
  constructor(
    @inject('TimeIntervalsRepository')
    private timeIntervalsRepository: ITimeIntervalsRepository,
  ) {}

  public async execute(timeIntervalId: string): Promise<void> {
    const result = await this.timeIntervalsRepository.findById(timeIntervalId)

    if (!result) throw new AppError('Time interval not found', 404)

    await this.timeIntervalsRepository.delete(result.id)
  }
}

export default DeleteTimeIntervalsService
