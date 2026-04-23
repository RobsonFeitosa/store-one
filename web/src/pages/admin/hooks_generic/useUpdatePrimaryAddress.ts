import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'

interface UpdatePrimaryAddressProps {
  uri: string
  addressId: string
}

const updatePrimaryAddress = async ({
  uri,
  addressId,
}: UpdatePrimaryAddressProps) => {
  try {
    const response = await api.patch(
      urlBuilder({
        address: [uri, addressId].join('/'),
      }),
    )

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useUpdatePrimaryAddress = () => {
  const uri = [URLs.ADDRESS, URLs.ADDRESS_PRIMARY].join('')

  return useMutation({
    mutationFn: (addressId: string) => updatePrimaryAddress({ uri, addressId }),
  })
}

