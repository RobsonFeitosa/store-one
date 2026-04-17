export interface ITimeIntervalsDTO {
  id: string
  professional_id: string
  week_day: number
  time_start_in_minutes_one: number
  time_end_in_minutes_one: number
  time_start_in_minutes_two: number
  time_end_in_minutes_two: number
}

export type ICreateTimeIntervalsDTO = Omit<ITimeIntervalsDTO, 'id'>
