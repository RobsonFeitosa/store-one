import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'

const deleteProfessional = async (professionalId: string) => {
  try {
    await api.delete(
      urlBuilder({
        address: [URLs.PROFESSIONALS, professionalId].join('/'),
      }),
    )
  } catch (error) {
    console.error(error)
  }
}

export const useDeleteProfessional = () => {
  return useMutation({
    mutationFn: (professionalId: string) => deleteProfessional(professionalId),
  })
}

