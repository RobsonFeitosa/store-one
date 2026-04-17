import { IVariationDTO } from './variation.dto'

interface Option {
  label: string
  value: string
}

export interface IAttributeDTO {
  id?: string
  product_id?: string
  name: string
  created_at?: Date
  updated_at?: Date
  options: Option[]
  variations: IVariationDTO[]
}

export type ICreateAttributeDTO = Omit<
  IAttributeDTO,
  'id' | 'variations' | 'created_at' | 'updated_at'
>
