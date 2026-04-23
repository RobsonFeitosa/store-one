import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'
import { ICreateCategoryDTO } from '../dtos/category.dto'

const createCategory = async (payload: ICreateCategoryDTO) => {
  try {
    const response = await api.post(
      urlBuilder({
        address: URLs.CATEGORIES,
      }),
      payload,
    )

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: (payload: ICreateCategoryDTO) => createCategory(payload),
  })
}

