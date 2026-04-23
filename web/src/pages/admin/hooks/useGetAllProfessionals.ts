import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IProfessionalDTO } from '../schedules/dtos/professional.dto'

const getProfessionals = async () => {
  try {
    const response = await api.get(
      urlBuilder({
        address: URLs.PROFESSIONALS,
      }),
    )

    return response.data as [IProfessionalDTO[], number]
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllProfessionals = () => {
  return useQuery({
    queryKey: ['getProfessionals'],
    queryFn: () => getProfessionals(),
    enabled: false,
  })
}

