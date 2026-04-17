import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'

interface UpdateTrackingCodeProps {
  uri: string
  orderId: string
  tracking_code: string
}

type MutationProps = Omit<UpdateTrackingCodeProps, 'uri'>

const updateTrackingCode = async ({
  uri,
  orderId,
  tracking_code,
}: UpdateTrackingCodeProps) => {
  try {
    const response = await api.patch(
      urlBuilder({
        address: [uri, orderId].join('/'),
      }),
      {
        tracking_code,
      },
    )

    return response
  } catch (error: any) {
    console.error(error)
  }
}

export const useUpdateTrackingCode = () => {
  const uri = [URLs.ORDERS, URLs.ORDERS_TRACKING_CODE].join('')

  return useMutation({
    mutationFn: ({ tracking_code, orderId }: MutationProps) =>
      updateTrackingCode({ uri, orderId, tracking_code }),
  })
}
