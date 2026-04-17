import { IAddressDTO } from './address.dto'
import { IProductDTO } from './product.dto'

export interface ICreateOrderStatusDTO {
  name: string
  order_id: string
}

export interface StatusOrder {
  id: string
  name: string
  order_id: string
  created_at: Date
  updated_at: Date
}

export interface IProductsOrder {
  id: string
  order_id: string
  price: number
  quantity: number
  product: IProductDTO
  created_at: Date
  updated_at: Date
}

export interface IOrderDTO {
  id: string
  cod_order: string
  status: StatusOrder[] | null
  tracking_code: string | null
  user: {
    id: string
    name: string
    email: string
  }
  orders_products: IProductsOrder[]
  address: IAddressDTO
  professional_name?: string | null
  amount: number
  address_id?: string | null
  type_product: string
  freight?: string | null
  coupon_applied?: string | null
  payment_method: 'ticket' | 'pix' | 'card'
  created_at: string
  updated_at: string
}

export interface ICreateOrderDTO
  extends Omit<
    IOrderDTO,
    | 'id'
    | 'created_at'
    | 'updated_at'
    | 'products'
    | 'coupon_applied'
    | 'orders_products'
    | 'freight'
    | 'status'
    | 'cod_order'
    | 'user'
    | 'address'
  > {
  products: {
    productId: string
    quantity: number
  }[]
  coupon_applied?: {
    coupon: string
    discount: number
  }
  freight?: {
    name: string
    value: number
  }
}
