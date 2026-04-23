import { IOrderDTO } from '@/pages/dtos/orders.dto'
import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'

interface Options {
  limit: number
  page: number
}

const getUrl = (options?: Options) => {
  let url

  if (options) {
    const searchParams = new URLSearchParams([
      ['limit', String(options.limit)],
      ['page', String(options.page)],
    ])

    url = [URLs.ORDERS, searchParams].join('?')
  } else {
    url = URLs.ORDERS
  }

  return url
}

const getOrders = async (options?: Options) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: getUrl(options),
      }),
    )

    return response.data.result as [IOrderDTO[], number]
  } catch (error) {
    console.error(error)
  }
}

export const useGetOrders = (options?: Options, key?: string) => {
  return useQuery({
    queryKey: ['getOrders', key],
    queryFn: () => getOrders(options),
    enabled: false,
  })
}
