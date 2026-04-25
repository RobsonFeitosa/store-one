import { Inject, Injectable } from '@nestjs/common'
import { ISchedulingRepository } from '../domain/repositories/scheduling.repository.interface'
import { Scheduling } from '../domain/entities/scheduling.entity'
import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'

@Injectable()
export class IndexSchedulingUseCase {
  constructor(
    @Inject('SCHEDULING_REPOSITORY_TOKEN')
    private schedulingRepository: ISchedulingRepository,
  ) {}

  async execute(options: IPaginationOptionsDTO): Promise<[any[], number]> {
    const [schedulings, count] = await this.schedulingRepository.findAndCount(options)

    const mappedSchedulings = schedulings.map(schedule => {
      const startDate = new Date(schedule.date)
      const endDate = new Date(startDate)
      
      let title = 'Serviço não identificado'
      
      if (schedule.product) {
        title = schedule.product.name
        if (schedule.product.time) {
          const timeParts = schedule.product.time.split(':')
          const hours = parseInt(timeParts[0] || '0', 10)
          const minutes = parseInt(timeParts[1] || '0', 10)
          endDate.setHours(endDate.getHours() + hours)
          endDate.setMinutes(endDate.getMinutes() + minutes)
        } else {
          endDate.setHours(endDate.getHours() + 1) // default 1 hour
        }
      } else {
        endDate.setHours(endDate.getHours() + 1) // default 1 hour
      }

      return {
        id: schedule.id,
        title,
        startTimeDate: startDate.toISOString(),
        endTimeDate: endDate.toISOString(),
        customerName: schedule.name,
        professional: schedule.professional?.name || 'Não definido',
        isPaid: false, // You can verify payment status via order later
        bgColor: '#bcdaff',
        createdAt: schedule.created_at,
        updatedAt: schedule.updated_at,
      }
    })

    return [mappedSchedulings, count]
  }
}
