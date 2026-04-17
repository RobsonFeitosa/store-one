import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IProductDTO } from '@/pages/dtos/product.dto'
import { IOptionsDTO, useBuilderUrl } from '@/hooks/useBuilderUrl'

interface UserGetServicesProps {
  options: IOptionsDTO
  userId?: string
}

const getServices = async (url: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: url,
      }),
    )

    return response.data as [IProductDTO[], number]
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllServices = (data: UserGetServicesProps) => {
  const { options, ...rest } = data

  const { url } = useBuilderUrl(URLs.PRODUCTS, options, {
    ...rest,
    type: 'service',
  })

  return useQuery({
    queryKey: ['getServices'],
    queryFn: () => getServices(url),
    enabled: false,
  })
}
