import Schedule from '../infra/typeorm/entities/Schedule'

type ICreateScheduleDTO = Omit<Schedule, 'id'>

export default ICreateScheduleDTO
