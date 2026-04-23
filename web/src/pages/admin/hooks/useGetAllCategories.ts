import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IOptionsDTO, useBuilderUrl } from '@/hooks/useBuilderUrl'
import { ICategoryDTO } from '../dtos/category.dto'

const getAllCategories = async (url: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: url,
      }),
    )

    return response.data.result as [ICategoryDTO[], number]
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllCategories = (
  options?: IOptionsDTO,
  type?: string | null,
) => {
  const { url } = useBuilderUrl(URLs.CATEGORIES, options, { type })

  return useQuery({
    queryKey: ['getAllCategories', type],
    queryFn: () => getAllCategories(url),
    enabled: false,
  })
}

