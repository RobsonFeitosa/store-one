import { IProfessionalDTO } from './professional.dto'

export interface ITeamsDTO {
  id: string
  user_id: string | null
  operation: string
  name: string
  created_at: Date
  updated_at: Date
  professional: IProfessionalDTO[]
  service_id?: string
}

export interface ICreateTeamsDTO
  extends Omit<
    ITeamsDTO,
    'id' | 'user_id' | 'professionals' | 'created_at' | 'updated_at'
  > {
  professionalsIds: string[]
}
