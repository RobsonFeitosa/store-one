import { ibge } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'

export type StateIbge = {
  id: number
  nome: string
  regiao: { id: number; sigla: string; nome: string }
  sigla: string
}

const getAllStates = async () => {
  try {
    const response = await ibge.get<StateIbge[]>(
      urlBuilder({
        address: URLs.STATE_REGION_GET_ALL,
      }),
    )

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllStates = () => {
  return useQuery({
    queryKey: ['getAllStates'],
    queryFn: () => getAllStates(),
    enabled: false,
  })
}
