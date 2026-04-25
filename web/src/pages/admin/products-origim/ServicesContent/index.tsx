import { Text } from '@lemonade-technologies-hub-ui/react'
import { IProductDTO } from '@/pages/admin/dtos/product.dto'
import Image from 'next/image'
import formatValue from '@/utils/formatValue'

import { ImageSquare } from 'phosphor-react'
import { IAttributeDTO } from '@/pages/admin/dtos/attribute.dto'

import {
  CategoriesClip,
  CropLink,
  ImageWrapper,
  ProductContentContainer,
  ProductsWrapper,
  TeamsWrapper,
  WrapperPrice,
} from './styles'

interface ServicesContentProps {
  products: IProductDTO[]
}

export default function ServicesContent({ products }: ServicesContentProps) {
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
        <Text as="strong">Serviço</Text>
        <Text as="strong">Preço</Text>
        <Text as="strong">Equipes</Text>
        <Text as="strong">Tempo</Text>
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
            <CropLink href={`/admin/services/${product.slug}/${product.id}`}>
              <Text>{product.name}</Text>
            </CropLink>
          </div>

          <div>
            {product.mode_data === 'single' ? (
              <WrapperPrice>
                {product.price !== null && (
                  <Text>{formatValue(product.price)}</Text>
                )}
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
            {product.team && product.team.length > 0 ? (
              <TeamsWrapper>
                {product.team.map((t: any) => (
                  <Text key={t.id}>{t.name}</Text>
                ))}
              </TeamsWrapper>
            ) : (
              <Text>sem equipe</Text>
            )}
          </div>

          <div>
            <Text>tempo</Text>
          </div>

          <CategoriesClip>
            {product.categories_items?.slice(0, 5).map((category) => (
              <div key={category.id}>
                <Text as="span">{category.name}</Text>
              </div>
            ))}
          </CategoriesClip>
        </ProductsWrapper>
      ))}
    </ProductContentContainer>
  )
}


