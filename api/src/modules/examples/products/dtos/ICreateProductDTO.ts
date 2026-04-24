import Product from '../infra/typeorm/entities/Product'

export type IModeData = 'single' | 'multiple'

export default interface CreateProductDTO
  extends Omit<
    Product,
    | 'id'
    | 'deleted_at'
    | 'created_at'
    | 'updated_at'
    | 'orders_products'
    | 'wish'
    | 'images'
    | 'attributes'
    | 'product_data'
    | 'categoriesParse'
    | 'categories_items'
    | 'time_discount'
    | 'team'
    | 'mode_data'
  > {
  mode_data: IModeData
}
