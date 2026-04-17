export interface ICreateTransactionsDTO {
  api_key: string
  amount: number
  payment_method: string
  pix_expiration_date: Date
  pix_additional_fields: [
    {
      name: string
      value: string
    },
  ]
}

export interface ICreatePixTransactionsDTO {
  order_id: string
  amount: number
  brand: string
  payment_method: string
  status: string
  tid: string
}
