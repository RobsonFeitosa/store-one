import { IAddressDTO } from '@/pages/dtos/address.dto'
import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'

const updateAddress = async (payload: IAddressDTO, addressId: string) => {
  const uri = [URLs.ADDRESS, '/', addressId].join('')

  try {
    const response = await api.put(
      urlBuilder({
        address: uri,
      }),
      payload,
    )

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useUpdateAddress = (addressId: string) => {
  return useMutation({
    mutationFn: (payload: IAddressDTO) => updateAddress(payload, addressId),
  })
}
