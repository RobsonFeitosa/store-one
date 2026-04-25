/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { useCreateTransaction } from './useCreateTransaction'
import { useCreatePixTransaction } from './useCreatePixTransaction'
import { AxiosResponse } from 'axios'
import { useOrder } from '@/hooks/providers/order'
import { ICreateOrderDTO, ICreateOrderStatusDTO } from '@/pages/dtos/orders.dto'
import {
  ICreatePixTransactionsDTO,
  ICreateTransactionsDTO,
} from '@/pages/dtos/transactions.dto'
import { useCreateOrderStatus } from './useCreateOrderStatus'
import { ICreateScheduleDTO, IScheduleDTO } from '@/pages/dtos/schedule.dto'
import { useCreateSchedule } from './useCreateSchedule'

function add10Minutes() {
  const minutesToAdd = 20
  const currentDate = new Date()
  const futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000)
  return futureDate
}

export interface useMutationProps {
  order: ICreateOrderDTO
  scheduling?: ICreateScheduleDTO
}

interface CreateOrderProps {
  payload: useMutationProps
  setQRCode: (url: string) => void
  onTid: (id: string) => void
  setOrderId: (id: string) => void
  mutateOrderStatusAsync: (
    payloadOrder: ICreateOrderStatusDTO,
  ) => Promise<AxiosResponse<any, any> | undefined>
  mutateTransactionsAsync: (
    payloadTransactions: ICreateTransactionsDTO,
  ) => Promise<AxiosResponse<any, any> | undefined>
  mutatePixTransactionsAsync: (
    payloadPixTransactions: ICreatePixTransactionsDTO,
  ) => Promise<AxiosResponse<any, any> | undefined>
  mutateScheduleAsync: (
    payloadSchedule: ICreateScheduleDTO,
  ) => Promise<[IScheduleDTO[], number] | undefined>
}

const createOrder = async ({
  payload,
  onTid,
  setOrderId,
  setQRCode,
  mutateOrderStatusAsync,
  mutateTransactionsAsync,
  mutatePixTransactionsAsync,
  mutateScheduleAsync,
}: CreateOrderProps) => {
  try {
    const { order, scheduling } = payload
    const { amount } = order
    const responseOrder = await api.post(
      urlBuilder({
        address: URLs.ORDERS,
      }),
      order,
    )

    if (responseOrder.status === 200) {
      setOrderId(responseOrder.data.id)

      if (order.address_id) {
        await mutateOrderStatusAsync({
          name: 'awaiting_pickup',
          order_id: responseOrder.data.id,
        })
      }

      if (order.type_product === 'service' && scheduling) {
        await mutateScheduleAsync({
          order_id: responseOrder.data.id,
          ...scheduling,
        })
      }

      // TODO: Pular sistema de pagamento por enquanto
      /*
      const responseTransaction = await mutateTransactionsAsync({
        api_key: process.env.NEXT_PUBLIC_PAGARME_API_KEY ?? 'key-not-exist',
        amount: Number(amount),
        payment_method: 'pix',
        pix_expiration_date: add10Minutes(),
        pix_additional_fields: [
          {
            name: 'Qty',
            value: String(order.products.length),
          },
        ],
      })

      if (!responseTransaction) {
        return
      }

      if (responseTransaction.status === 200) {
        // TODO: gerador de pix cancelado para modo de teste
        // setQRCode(responseTransaction.data.pix_qr_code)
        // const responsePix = await mutatePixTransactionsAsync({
        //   order_id: responseOrder.data.id,
        //   amount: Number(amount),
        //   brand: 'null',
        //   payment_method: 'pix',
        //   status: 'waiting_payment',
        //   tid: responseTransaction.data.tid,
        // })
        // if (!responsePix) {
        //   return
        // }
        // if (responsePix.status === 200) {
        //   onTid(responsePix.data.tid)
        // }
      }
      */
    }
  } catch (error) {
    console.error(error)
  }
}

export const useCreateOrder = () => {
  const { setQRCode, setOrderId, setTransactionId } = useOrder()
  const { mutateAsync: mutateOrderStatusAsync } = useCreateOrderStatus()
  const { mutateAsync: mutateTransactionsAsync } = useCreateTransaction()
  const { mutateAsync: mutatePixTransactionsAsync } = useCreatePixTransaction()
  const { mutateAsync: mutateScheduleAsync } = useCreateSchedule()

  function onTid(id: string) {
    setTransactionId(id)
  }

  return useMutation({
    mutationFn: async (payload: useMutationProps) => {
      try {
        const { order, scheduling } = payload
        
        // TODO: Módulo de pedidos não implementado na API, ignorando criação do pedido
        /*
        const { amount } = order
        const responseOrder = await api.post(
          urlBuilder({
            address: URLs.ORDERS,
          }),
          order,
        )

        if (responseOrder.status === 200) {
          setOrderId(responseOrder.data.id)

          if (order.address_id) {
            await mutateOrderStatusAsync({
              name: 'awaiting_pickup',
              order_id: responseOrder.data.id,
            })
          }
        */

        if (order.type_product === 'service' && scheduling) {
          await mutateScheduleAsync({
            ...scheduling,
          })
        }

        /*
        }
        */
      } catch (error) {
        console.error(error)
      }
    },
  })
}
