import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { useBuilderUrl } from '@/hooks/useBuilderUrl'
import { IPaginationOptionDTO } from '@/pages/dtos/paginationOption.dto'
import { useAuth } from '@/hooks/providers/auth'

export interface ICustomerDTO {
  id: string
  name: string
  email: string
  role: string
  tenant_id: string | null
  created_at: Date
  updated_at: Date
  settings: {
    avatar_url: string | null
    actived: boolean
    level: number
  } | null
}

const getCustomers = async (url: string) => {
  try {
    const response = await api.get(urlBuilder({ address: url }))
    const result = response.data.result
    return [result.users, result.total] as [ICustomerDTO[], number]
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllCustomers = (options?: IPaginationOptionDTO) => {
  const { url } = useBuilderUrl(URLs.USERS_CUSTOMERS, options)
  const { user } = useAuth()

  return useQuery({
    queryKey: ['getCustomers', options],
    queryFn: () => getCustomers(url),
    enabled: !!user,
  })
}
