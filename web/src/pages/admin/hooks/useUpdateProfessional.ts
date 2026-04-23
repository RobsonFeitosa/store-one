import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'
import { ICreateProfessionalDTO } from '../schedules/dtos/professional.dto'
import { IUpdateTimeIntervalsDTO } from '../schedules/dtos/time-intervals.dto'
import { AxiosResponse } from 'axios'
import { useUpdateTimeIntervals } from './useUpdateTimeIntervals'

interface UpdateProfessionalProps {
  payload: ICreateProfessionalDTO
  professionalId: string | undefined
  updateTimeIntervalsAsync: (
    payload: IUpdateTimeIntervalsDTO[],
  ) => Promise<AxiosResponse<any, any> | undefined>
}

const updateProfessional = async ({
  payload,
  professionalId,
  updateTimeIntervalsAsync,
}: UpdateProfessionalProps) => {
  if (!professionalId) {
    return
  }

  try {
    const { timeIntervals, ...rest } = payload

    const response = await api.put(
      urlBuilder({
        address: [URLs.PROFESSIONALS, professionalId].join('/'),
      }),
      rest,
    )

    if (response.status === 200 && timeIntervals) {
      return await updateTimeIntervalsAsync(
        timeIntervals.map((timeInterval) => ({
          ...timeInterval,
          professional_id: response.data.id,
        })),
      )
    }

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useUpdateProfessional = (professionalId: string | undefined) => {
  const { mutateAsync: updateTimeIntervalsAsync } = useUpdateTimeIntervals()
  return useMutation({
    mutationFn: (payload: ICreateProfessionalDTO) =>
      updateProfessional({ payload, professionalId, updateTimeIntervalsAsync }),
  })
}

