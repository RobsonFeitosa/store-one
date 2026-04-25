import { Inject, Injectable } from '@nestjs/common'
import { ISchedulingRepository } from '../domain/repositories/scheduling.repository.interface'
import { Scheduling } from '../domain/entities/scheduling.entity'

interface IRequest {
  date: Date
  professional_id: string
  order_id?: string
  product_id?: string
  name: string
  observations: string
}

@Injectable()
export class CreateSchedulingUseCase {
  constructor(
    @Inject('SCHEDULING_REPOSITORY_TOKEN')
    private schedulingRepository: ISchedulingRepository,
  ) {}

  async execute(data: IRequest): Promise<Scheduling> {
    const scheduling = await this.schedulingRepository.create(data)
    return scheduling
  }
}
