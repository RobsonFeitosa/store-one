import { ICreateAddressDTO } from '@/pages/dtos/address.dto'
import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'

const createAddress = async (payload: ICreateAddressDTO) => {
  try {
    const response = await api.post(
      urlBuilder({
        address: URLs.ADDRESS,
      }),
      payload,
    )

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useCreateAddress = () => {
  return useMutation({
    mutationFn: (payload: ICreateAddressDTO) => createAddress(payload),
  })
}

