import { IProfessionalDTO } from '@/pages/admin/schedules/dtos/professional.dto'

export interface IScheduleDTO {
  id: string
  date: string
  order_id?: string
  professional_id: string
  professional: IProfessionalDTO
  name: string
  observations: string
  created_at?: string
  updated_at?: string
}

export type ICreateScheduleDTO = Omit<IScheduleDTO, 'id'>

