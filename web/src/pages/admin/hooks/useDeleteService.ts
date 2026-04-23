import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'

const deleteService = async (serviceId: string) => {
  try {
    await api.delete(
      urlBuilder({
        address: [URLs.SCHEDULES, URLs.SCHEDULES_SERVICES, '/', serviceId].join(
          '',
        ),
      }),
    )
  } catch (error) {
    console.error(error)
  }
}

export const useDeleteService = () => {
  return useMutation({
    mutationFn: (serviceId: string) => deleteService(serviceId),
  })
}

