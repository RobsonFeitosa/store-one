import Schedule from '../infra/typeorm/entities/Schedule'

type ICreateScheduleDTO = Omit<Schedule, 'id' | 'created_at' | 'updated_at'>

export default ICreateScheduleDTO
