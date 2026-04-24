import ProductAttributes from '@modules/products/infra/typeorm/entities/ProductAttributes'

type ICreateProductAttributesDTO = Omit<
  ProductAttributes,
  'id' | 'created_at' | 'updated_at' | 'optionsParse' | 'variations' | 'product'
>
export default ICreateProductAttributesDTO
