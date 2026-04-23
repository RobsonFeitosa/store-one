import { IArchiveDTO } from './archive.dto'

export interface IVariationDTO {
  id?: string
  product_attr_id?: string
  price?: number
  quantity?: number
  actived: boolean
  weight?: number
  sku?: string
  name?: string
  dimensions?: {
    width?: number | null
    length?: number | null
    height?: number | null
  }
  image?: File | IArchiveDTO
  created_at?: Date
  updated_at?: Date
}

export interface ICreateVariationDTO
  extends Omit<IVariationDTO, 'id' | 'image' | 'created_at' | 'updated_at'> {
  image: File | null
}

