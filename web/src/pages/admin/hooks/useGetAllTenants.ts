import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { ITenantDTO } from '../dtos/tenant.dto'
import { useBuilderUrl } from '@/hooks/useBuilderUrl'
import { IPaginationOptionDTO } from '@/pages/dtos/paginationOption.dto'
import { useAuth } from '@/hooks/providers/auth'

const getTenants = async (url: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: url,
      }),
    )

    return response.data.result as ITenantDTO[]
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllTenants = (options?: IPaginationOptionDTO) => {
  const { url } = useBuilderUrl(URLs.TENANTS, options)
  const { user } = useAuth()

  return useQuery({
    queryKey: ['getTenants', options],
    queryFn: () => getTenants(url),
    enabled: !!user,
  })
}
