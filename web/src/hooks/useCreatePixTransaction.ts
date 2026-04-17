import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'
import { ICreatePixTransactionsDTO } from '@/pages/dtos/transactions.dto'

interface CreatePixTransactionProps {
  payload: ICreatePixTransactionsDTO
}

const createPixTransaction = async ({ payload }: CreatePixTransactionProps) => {
  try {
    const response = await api.post(
      urlBuilder({
        address: [URLs.TRANSACTIONS, URLs.TRANSACTIONS_PIX].join('/'),
      }),
      payload,
    )

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useCreatePixTransaction = () => {
  return useMutation({
    mutationFn: (payload: ICreatePixTransactionsDTO) =>
      createPixTransaction({ payload }),
  })
}
