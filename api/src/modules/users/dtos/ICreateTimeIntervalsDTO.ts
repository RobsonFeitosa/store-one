import TimeIntervals from '../infra/typeorm/entities/TimeIntervals'

type ICreateTimeIntervalsDTO = Omit<
  TimeIntervals,
  'id' | 'created_at' | 'updated_at' | 'professional'
>

export default ICreateTimeIntervalsDTO
