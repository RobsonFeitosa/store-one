import { api } from '@/utils/handleClient'
import { URLs } from '@/utils/urlBuilder'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ICreateTenantDTO } from '../dtos/tenant.dto'

const updateTenant = async (id: string, data: ICreateTenantDTO) => {
  const response = await api.put(`${URLs.TENANTS}/${id}`, data)
  return response.data
}

export const useUpdateTenant = (id?: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ICreateTenantDTO) => updateTenant(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTenants'] })
    },
  })
}
