import { Text } from '@lemonade-technologies-hub-ui/react'
import { IProductDTO } from '@/pages/admin/dtos/product.dto'
import Image from 'next/image'
import formatValue from '@/utils/formatValue'

import {
  CategoriesClip,
  CropLink,
  ImageWrapper,
  ProductContentContainer,
  ProductsWrapper,
  WrapperPrice,
} from './styles'
import { ImageSquare } from 'phosphor-react'
import { IAttributeDTO } from '@/pages/admin/dtos/attribute.dto'

interface ProductsContentProps {
  products: IProductDTO[]
}

export default function ProductsContent({ products }: ProductsContentProps) {
  function buildVarsLabels(attributes: IAttributeDTO[]) {
    const [variants] = attributes.map((attribute) => attribute.variations)

    return variants.map((variant: any) => (
      <Text key={variant.id}>
        {variant.name}: {formatValue(variant.price ?? 0)}
      </Text>
    ))
  }

  return (
    <ProductContentContainer>
      <ProductsWrapper>
        <Text as="strong">Imagem</Text>
        <Text as="strong">Produto</Text>
        <Text as="strong">Estoque</Text>
        <Text as="strong">Preço</Text>
        <Text as="strong">Dimensões</Text>
        <Text as="strong">Peso</Text>
        <Text as="strong">Categorias</Text>
      </ProductsWrapper>

      {products.map((product) => (
        <ProductsWrapper key={product.id}>
          <div>
            <ImageWrapper>
              {product.images && product.images[0]?.picture_url ? (
                <Image
                  src={product.images[0]?.picture_url}
                  layout="fill"
                  objectFit={'cover'}
                  alt={product.name}
                />
              ) : (
                <ImageSquare size={28} />
              )}
            </ImageWrapper>
          </div>
          <div>
            <CropLink href={`/admin/products/${product.slug}/${product.id}`}>
              <Text>{product.name}</Text>
            </CropLink>
          </div>
          <div>
            <Text>
              {product.product_data?.quantity
                ? product.product_data?.quantity
                : '--'}
            </Text>
          </div>
          <div>
            {product.mode_data === 'single' ? (
              <WrapperPrice>
                {product.price && <Text>{formatValue(product.price)}</Text>}
                {product.old_price && (
                  <Text style={{ textDecoration: 'line-through' }}>
                    {formatValue(product.old_price)}
                  </Text>
                )}
              </WrapperPrice>
            ) : (
              <WrapperPrice>
                {product.attributes &&
                  product.attributes.length > 0 &&
                  buildVarsLabels(product.attributes)}
              </WrapperPrice>
            )}
          </div>

          <div>
            {product.product_data?.dimensions ? (
              <>
                <Text>Altura: {product.product_data?.dimensions?.height}</Text>
                <Text>Largura: {product.product_data?.dimensions?.width}</Text>
                <Text>
                  Comprimento: {product.product_data?.dimensions?.length}
                </Text>
              </>
            ) : (
              <Text>--</Text>
            )}
          </div>

          <div>
            {product.product_data?.weight ? (
              <Text>{product.product_data?.weight}g</Text>
            ) : (
              <Text>--</Text>
            )}
          </div>

          <CategoriesClip>
            {product.categories_items && product.categories_items.length > 0 ? (
              <>
                {product.categories_items?.slice(0, 5).map((category) => (
                  <div key={category.id}>
                    <Text as="span">{category.name}</Text>
                  </div>
                ))}
              </>
            ) : (
              <Text as="span">--</Text>
            )}
          </CategoriesClip>
        </ProductsWrapper>
      ))}
    </ProductContentContainer>
  )
}


