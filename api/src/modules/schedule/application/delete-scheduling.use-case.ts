import { Inject, Injectable } from '@nestjs/common'
import { ISchedulingRepository } from '../domain/repositories/scheduling.repository.interface'

@Injectable()
export class DeleteSchedulingUseCase {
  constructor(
    @Inject('SCHEDULING_REPOSITORY_TOKEN')
    private schedulingRepository: ISchedulingRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.schedulingRepository.delete(id)
  }
}
