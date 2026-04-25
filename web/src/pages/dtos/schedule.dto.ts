import { IProfessionalDTO } from '@/dtos/professional.dto'

export interface IScheduleDTO {
  id: string
  date: string
  order_id?: string
  product_id?: string
  professional_id: string
  professional?: IProfessionalDTO
  name: string
  observations: string
}

export type ICreateScheduleDTO = Omit<IScheduleDTO, 'id'>
