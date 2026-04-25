import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ISchedulingRepository } from '../domain/repositories/scheduling.repository.interface'
import { Scheduling } from '../domain/entities/scheduling.entity'

@Injectable()
export class ShowSchedulingUseCase {
  constructor(
    @Inject('SCHEDULING_REPOSITORY_TOKEN')
    private schedulingRepository: ISchedulingRepository,
  ) {}

  async execute(id: string): Promise<Scheduling> {
    const scheduling = await this.schedulingRepository.findById(id)

    if (!scheduling) {
      throw new NotFoundException('Scheduling not found')
    }

    return scheduling
  }
}
