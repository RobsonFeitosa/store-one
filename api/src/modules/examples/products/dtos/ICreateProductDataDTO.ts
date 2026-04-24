import ProductData from '@modules/products/infra/typeorm/entities/ProductData'

export interface IDimensionsDTO {
  width: number
  length: number
  height: number
}

export type IPublished = 'draft' | 'pending-review' | 'private' | 'published'

export type IStatus = 'public' | 'private'

export default interface ICreateProductDataDTO
  extends Omit<
    ProductData,
    | 'id'
    | 'optionsParse'
    | 'product'
    | 'created_at'
    | 'dimensions'
    | 'updated_at'
    | 'mode_data'
  > {
  dimensions: {
    width: number
    length: number
    height: number
  }
}
