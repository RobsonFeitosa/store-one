import { IProfessionalDTO } from '@/dtos/professional.dto'
import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
const getProfessionalsAvailables = async () => {
  try {
    const response = await api.get(
      urlBuilder({
        address: [URLs.PROFESSIONALS, URLs.PROFESSIONALS_AVAILABLES].join(''),
      }),
    )

    return response.data.result as IProfessionalDTO[]
  } catch (error) {
    console.error(error)
  }
}

export const useGetProfessionalsAvailables = () => {
  return useQuery({
    queryKey: ['getProfessionalsAvailables'],
    queryFn: () => getProfessionalsAvailables(),
    enabled: false,
  })
}
