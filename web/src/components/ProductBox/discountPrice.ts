export default function discountPrice(priceOrigin: number, discount: number) {
  return priceOrigin - (priceOrigin * discount) / 100
}
