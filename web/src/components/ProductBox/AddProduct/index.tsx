/* eslint-disable react-hooks/exhaustive-deps */
import { ShoppingCart } from 'phosphor-react'
import { BtnAdd, AddProductContent, AddWrapper, Clip } from './styles'
import { Text } from '@lemonade-technologies-hub-ui/react'
import { useOrder } from '@/hooks/providers/order'
import { IProductDTO } from '@/pages/dtos/product.dto'
import { useEffect, useState } from 'react'

interface AddProductProps {
  product: IProductDTO
  label?: string
  size?: 'sm' | 'xs'
}

export default function AddProduct({ product, label, size }: AddProductProps) {
  const {
    addOrder,
    removeProductOrder,
    order: { items },
  } = useOrder()

  const [hasProduct, setHasProduct] = useState(
    !!items.find((p) => p.id === product.id),
  )

  function handleProduct() {
    if (items.find((p) => p.id === product.id)) {
      removeProductOrder(product.id)
    } else {
      addOrder(
        {
          id: product.id,
          name: product.name,
          pictureUrl: product.images ? product.images[0].picture_url : '',
          quantity: 1,
          typeProduct: product.type,
          price: product.price,
          slug: product.slug,
        },
        1,
      )
    }
  }

  useEffect(() => {
    if (product) {
      setHasProduct(!!items.find((p) => p.id === product.id))
    }
  }, [items])

  return (
    <AddProductContent isAdded={hasProduct} size={size}>
      <BtnAdd onClick={handleProduct}>
        <AddWrapper>
          {hasProduct ? (
            <div>
              <Clip>1</Clip>
              <ShoppingCart />
            </div>
          ) : (
            <ShoppingCart />
          )}
        </AddWrapper>

        {label && <Text>{label}</Text>}
      </BtnAdd>
    </AddProductContent>
  )
}
