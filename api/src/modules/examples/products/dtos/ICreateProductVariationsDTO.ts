import ProductVariations from '@modules/products/infra/typeorm/entities/ProductVariations'

export type ICreateProductVariationsDTO = Omit<
  ProductVariations,
  'id' | 'created_at' | 'updated_at' | 'product_attr' | 'dimensionsParse'
>
