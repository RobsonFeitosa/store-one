import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'
import { IUpdateTimeIntervalsDTO } from '../schedules/dtos/time-intervals.dto'

const updateTimeIntervals = async (payload: IUpdateTimeIntervalsDTO[]) => {
  try {
    const response = await api.put(
      urlBuilder({
        address: [
          URLs.PROFESSIONALS,
          '/',
          payload[0].professional_id,
          URLs.PROFESSIONALS_TIME_INTERVALS,
        ].join(''),
      }),
      payload,
    )

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useUpdateTimeIntervals = () => {
  return useMutation({
    mutationFn: (payload: IUpdateTimeIntervalsDTO[]) =>
      updateTimeIntervals(payload),
  })
}

