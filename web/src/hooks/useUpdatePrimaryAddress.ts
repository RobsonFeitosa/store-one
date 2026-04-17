import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'

interface UpdatePrimaryAddressProps {
  uri: string
}

const updatePrimaryAddress = async ({ uri }: UpdatePrimaryAddressProps) => {
  try {
    const response = await api.patch(
      urlBuilder({
        address: uri,
      }),
    )

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useUpdatePrimaryAddress = (addressId: string) => {
  const uri = [URLs.ADDRESS, URLs.ADDRESS_PRIMARY, '/', addressId].join('')

  return useMutation({
    mutationFn: () => updatePrimaryAddress({ uri }),
  })
}
