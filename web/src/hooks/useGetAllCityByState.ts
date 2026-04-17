import { ibge } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { StateIbge } from './useGetAllStates'

const getAllCity = async (state?: string) => {
  try {
    if (!state) {
      return
    }

    const { CITY_REGION_GET_ALL, STATE_REGION_GET_ALL } = URLs
    const url = [STATE_REGION_GET_ALL, state, CITY_REGION_GET_ALL].join('/')

    const response = await ibge.get<StateIbge[]>(
      urlBuilder({
        address: url,
      }),
    )

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllCityByState = (state: string) => {
  return useQuery({
    queryKey: ['getAllCity', state],
    queryFn: () => getAllCity(state),
    enabled: false,
  })
}
