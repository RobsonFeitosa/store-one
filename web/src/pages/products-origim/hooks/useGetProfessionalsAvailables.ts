import { IProfessionalDTO } from '@/dtos/professional.dto'
import { useAuth } from '@/hooks/providers/auth'
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

    const [professionals] = response.data.result

    return professionals as IProfessionalDTO[]
  } catch (error) {
    console.error(error)
  }
}

export const useGetProfessionalsAvailables = () => {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['getProfessionalsAvailables'],
    queryFn: () => getProfessionalsAvailables(),
    enabled: !!user,
  })
}
