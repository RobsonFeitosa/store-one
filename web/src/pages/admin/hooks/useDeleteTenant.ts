import { api } from '@/utils/handleClient'
import { URLs } from '@/utils/urlBuilder'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const deleteTenant = async (id: string) => {
  await api.delete(`${URLs.TENANTS}/${id}`)
}

export const useDeleteTenant = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTenant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTenants'] })
    },
  })
}
