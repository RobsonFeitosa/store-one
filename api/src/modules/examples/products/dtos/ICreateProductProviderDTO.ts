import ProductProvider from '../infra/typeorm/entities/ProductProvider'

type ICreateProductProviderDTO = Omit<
  ProductProvider,
  'id' | 'created_at' | 'updated_at' | 'image'
>

export default ICreateProductProviderDTO
