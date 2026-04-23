import { IProductDTO } from '@/pages/admin/dtos/product.dto'

export type StatusTimeDiscount = 'actived' | 'idle' | 'complete' | 'cancel'
export type OptionProductsTimeDiscount = {
  label: string
  value: string
}

export interface ITimeDiscountDTO {
  startDate: Date
  endDate: Date
  discount: number
  status: StatusTimeDiscount
  productIds: string[]
  products: IProductDTO[]
  id: string
  created_at: Date
  updated_at: Date
}

export type ICreateTimeDiscountDTO = Omit<
  ITimeDiscountDTO,
  'id' | 'products' | 'created_at' | 'updated_at'
>

