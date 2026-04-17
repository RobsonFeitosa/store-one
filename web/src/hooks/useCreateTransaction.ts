import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { pagarme } from '@/utils/handleClient'
import { ICreateTransactionsDTO } from '@/pages/dtos/transactions.dto'

interface CreateTransactionProps {
  payload: ICreateTransactionsDTO
}

const createTransaction = async ({ payload }: CreateTransactionProps) => {
  try {
    const response = await pagarme.post(
      urlBuilder({
        address: URLs.TRANSACTIONS,
      }),
      payload,
    )

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useCreateTransaction = () => {
  return useMutation({
    mutationFn: (payload: ICreateTransactionsDTO) =>
      createTransaction({ payload }),
  })
}
