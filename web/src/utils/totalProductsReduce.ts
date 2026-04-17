import { IProductsOrder } from '@/pages/dtos/orders.dto'

export default function totalProductsReduce(
  products: IProductsOrder[],
): number {
  const totalOrigin = products.reduce((acc, product) => {
    return acc + product.price * product.quantity
  }, 0)

  return totalOrigin
}
