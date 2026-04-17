import { useOrder } from '@/hooks/providers/order'
import { pagarme } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'

const verifyPixTimeout = async (
  tid: string,
  setPaid: (paid: boolean) => void,
) => {
  try {
    const response = await pagarme.get(
      urlBuilder({
        address: URLs.TRANSACTIONS_PAYABLES,
        searchParams: {
          api_key:
            process.env.NEXT_PUBLIC_PAGARME_API_KEY ?? 'not-exist-api-key',
          transaction_id: String(tid),
        },
      }),
    )

    if (response.status === 200) {
      if (response.data.length !== 0 && response.data[0].status === 'paid') {
        setPaid(true)
      }
    }

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useVerifyPixTimeout = (tid: string) => {
  const { setPaid } = useOrder()
  return useQuery({
    queryKey: ['verifyPixTimeout'],
    queryFn: () => verifyPixTimeout(tid, setPaid),
    enabled: false,
  })
}
