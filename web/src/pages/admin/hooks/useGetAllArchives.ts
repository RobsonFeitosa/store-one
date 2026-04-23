import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IOptionsDTO, useBuilderUrl } from '@/hooks/useBuilderUrl'
import { IArchiveDTO } from '../dtos/archive.dto'

const getAllArchives = async (url: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: url,
      }),
    )

    return response.data as [IArchiveDTO[], number]
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllArchives = (
  options?: IOptionsDTO,
  referenceId?: string,
  originName?: string,
) => {
  const { url } = useBuilderUrl(URLs.ARCHIVE, options, {
    referenceId,
    originName,
  })

  return useQuery({
    queryKey: ['getAllArchives'],
    queryFn: () => getAllArchives(url),
    enabled: false,
  })
}

