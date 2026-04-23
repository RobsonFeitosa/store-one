import { IUserDTO } from '@/pages/dtos/user.dto'
import { ITeamsDTO } from './teams.dto'
import {
  ICreateTimeIntervalsDTO,
  ITimeIntervalsDTO,
} from './time-intervals.dto'

export interface IProfessionalDTO {
  function: string
  invite?: string
  name: string
  actived: boolean
  user_id?: string | null
  user?: IUserDTO
  team_id?: string | null
  team?: ITeamsDTO
  timeIntervals: ITimeIntervalsDTO[]
  id: string
  created_at: Date
  updated_at: Date
}

export interface ICreateProfessionalDTO
  extends Omit<
    IProfessionalDTO,
    'id' | 'timeIntervals' | 'created_at' | 'updated_at'
  > {
  timeIntervals: ICreateTimeIntervalsDTO[]
}
