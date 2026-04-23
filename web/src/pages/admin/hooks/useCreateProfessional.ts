import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'
import { useCreateTimeIntevals } from './useCreateTimeIntevals'
import { AxiosResponse } from 'axios'
import { ICreateProfessionalDTO } from '../schedules/dtos/professional.dto'
import { ICreateTimeIntervalsDTO } from '../schedules/dtos/time-intervals.dto'

interface CreateProfessionalProps {
  payload: ICreateProfessionalDTO
  createTimeIntervalsAsync: (
    payload: ICreateTimeIntervalsDTO[],
  ) => Promise<AxiosResponse<any, any> | undefined>
}

const createProfessional = async ({
  payload,
  createTimeIntervalsAsync,
}: CreateProfessionalProps) => {
  try {
    const { timeIntervals, ...rest } = payload
    const response = await api.post(
      urlBuilder({
        address: [URLs.PROFESSIONALS].join(''),
      }),
      rest,
    )

    if (response.status === 200 && timeIntervals) {
      return await createTimeIntervalsAsync(
        timeIntervals.map((timeInterval) => ({
          ...timeInterval,
          professional_id: response.data.id,
        })),
      )
    }
    return response
  } catch (error: any) {
    console.error(error)
  }
}

export const useCreateProfessional = () => {
  const { mutateAsync: createTimeIntervalsAsync } = useCreateTimeIntevals()

  return useMutation({
    mutationFn: (payload: ICreateProfessionalDTO) =>
      createProfessional({ payload, createTimeIntervalsAsync }),
  })
}

