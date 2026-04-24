import { define } from 'typeorm-seeding'
import Product from '../entities/Product'

define(Product, () => {
  const product = new Product()

  product.name = 'teste'
  product.price = 100
  product.old_price = 200
  product.cod_product = '1729dc75-cfea-4fd8-8170-53af59e1d3c6'
  product.emphasis = false
  product.type = 'product'
  product.description = 'teste'

  return product
})
