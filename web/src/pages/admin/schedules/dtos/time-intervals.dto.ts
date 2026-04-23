export interface ITimeIntervalsDTO {
  id: string
  week_day: number
  time_end_in_minutes_one: number
  time_start_in_minutes_one: number
  time_end_in_minutes_two?: number
  time_start_in_minutes_two?: number
  professional_id: string
}

export type ICreateTimeIntervalsDTO = Omit<
  ITimeIntervalsDTO,
  'id' | 'professional_id'
>

export type IUpdateTimeIntervalsDTO = Omit<ITimeIntervalsDTO, 'id'>
