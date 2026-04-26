import { api } from '@/utils/handleClient'
import { URLs } from '@/utils/urlBuilder'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ICreateTenantDTO } from '../dtos/tenant.dto'

const createTenant = async (data: ICreateTenantDTO) => {
  const response = await api.post(URLs.TENANTS, data)
  return response.data
}

export const useCreateTenant = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTenant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTenants'] })
    },
  })
}
