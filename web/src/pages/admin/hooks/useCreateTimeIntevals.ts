import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'
import { ICreateTimeIntervalsDTO } from '../schedules/dtos/time-intervals.dto'

interface CreateTimeIntevalsProps {
  payload: ICreateTimeIntervalsDTO[]
}

const createTimeIntevals = async ({ payload }: CreateTimeIntevalsProps) => {
  try {
    const response = await api.post(
      urlBuilder({
        address: [URLs.PROFESSIONALS, URLs.PROFESSIONALS_TIME_INTERVALS].join(
          '',
        ),
      }),
      payload,
    )

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useCreateTimeIntevals = () => {
  return useMutation({
    mutationFn: (payload: ICreateTimeIntervalsDTO[]) =>
      createTimeIntevals({ payload }),
  })
}

