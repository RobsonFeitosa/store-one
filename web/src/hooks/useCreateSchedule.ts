import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { ICreateScheduleDTO, IScheduleDTO } from '@/pages/dtos/schedule.dto'
import { api } from '@/utils/handleClient'

const createSchedule = async (payload: ICreateScheduleDTO) => {
  try {
    const response = await api.post(
      urlBuilder({
        address: URLs.SCHEDULES,
      }),
      payload,
    )

    return response.data.result as [IScheduleDTO[], number]
  } catch (error) {
    console.error(error)
  }
}

export const useCreateSchedule = () => {
  return useMutation({
    mutationFn: (payload: ICreateScheduleDTO) => createSchedule(payload),
  })
}
