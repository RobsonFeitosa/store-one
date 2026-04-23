import { ITeamsDTO } from '@/pages/admin/schedules/dtos/teams.dto'
import { IArchiveDTO } from './archive.dto'
import { ICategoryDTO } from './category.dto'
import { IImagesProductDTO } from './imagesProduct.dto'
import { ITimeDiscountDTO } from './timeDiscount.dto'
import { IVariationDTO } from './variation.dto'
import { IWishDTO } from './wishProduct.dto'

interface ProductAttrOptions {
  label: string
  value: string
}

interface Attributes {
  id?: string
  name: string
  options: ProductAttrOptions[]
  variations: IVariationDTO[]
}

export interface ProductAttr {
  name: string
  options: ProductAttrOptions[]
}

export interface ProductData {
  id?: string
  quantity?: number
  sku: string
  weight: number
  dimensions: {
    width: number
    length: number
    height: number
  }
  code_bar?: string
}

export type TypeProduct = 'service' | 'product'

export interface IProductDTO {
  id: string
  name: string
  description?: string
  short_description?: string
  price: number
  type: TypeProduct
  published?: string
  visibility?: string
  old_price?: number
  categories?: (string | undefined)[]
  categories_items: ICategoryDTO[]
  product_data?: ProductData
  mode_data: string
  time: string
  team: ITeamsDTO[]
  attributes?: Attributes[]
  slug: string
  emphasis: boolean
  images?: IArchiveDTO[]
  image_primary: IImagesProductDTO
  wish: IWishDTO | null
  time_discount: ITimeDiscountDTO | null
  created_at: Date
  updated_at: Date
  deleted_at: Date
}

interface Dimensions {
  width: number
  length: number
  height: number
}

export interface IProductVariations {
  product_attr_id: string
  price: number
  quantity: number
  weight: number
  dimensions: Dimensions
  sku: string
}

