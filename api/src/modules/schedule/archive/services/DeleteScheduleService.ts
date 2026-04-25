import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IScheduleRepository from '../repositories/IScheduleRepository'

@injectable()
class DeleteScheduleService {
  constructor(
    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository,
  ) {}

  public async execute(scheduleId: string): Promise<void> {
    const result = await this.scheduleRepository.findById(scheduleId)

    if (!result) throw new AppError('Schedule not found', 404)

    await this.scheduleRepository.delete(result.id)
  }
}

export default DeleteScheduleService
