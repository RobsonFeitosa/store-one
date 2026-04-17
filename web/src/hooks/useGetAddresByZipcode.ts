import cep from 'cep-promise'

import { useMutation } from '@tanstack/react-query'
import { ToastMessage, useToast } from './providers/toast'

export interface AddresByZipCodeProps {
  cep: string
  state: string
  city: string
  street: string
  neighborhood: string
}

interface GetAddresByZipcodeProps {
  zipcode: string
  addToast: (message: Omit<ToastMessage, 'id'>) => void
}

const getAddresByZipcode = async ({
  zipcode,
  addToast,
}: GetAddresByZipcodeProps) => {
  try {
    const response = await cep(zipcode)

    return response as AddresByZipCodeProps
  } catch (error) {
    addToast({
      type: 'info',
      title: 'CEP inválido',
      description: 'O cep não existe ou não foi encontrado.',
    })
  }
}

export const useGetAddresByZipcode = () => {
  const { addToast } = useToast()

  return useMutation({
    mutationFn: (zipcode: string) => getAddresByZipcode({ zipcode, addToast }),
  })
}
