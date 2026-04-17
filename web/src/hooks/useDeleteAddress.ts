import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'

interface CreateAddressProps {
  addressId: string
}

const deleteAddress = async ({ addressId }: CreateAddressProps) => {
  try {
    const uri = [URLs.ADDRESS, '/', addressId].join('')

    const response = await api.delete(
      urlBuilder({
        address: uri,
      }),
    )

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useDeleteAddress = (addressId: string) => {
  return useMutation({
    mutationFn: () => deleteAddress({ addressId }),
  })
}
