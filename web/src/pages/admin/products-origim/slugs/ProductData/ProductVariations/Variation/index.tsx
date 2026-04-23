import {
  Checkbox,
  Heading,
  SelectAdvanced,
  Text,
  TextInput,
} from '@lemonade-technologies-hub-ui/react'
import {
  ImageWrapper,
  InputControlLabel,
  ProductItem,
  ProductItemTime,
  VariationContainer,
} from './styles'

import { ProductVariationContent } from '../styles'
import { IVariationDTO } from '@/pages/admin/dtos/variation.dto'
import { Control, Controller } from 'react-hook-form'
import { Col, Row } from 'react-bootstrap'
import UploadImage2 from '@/components/UploadImage2'
import { optionsTime } from './optionsTime'

interface VariationProps {
  control: Control<any>
  type: string
  productId?: string
  variation?: IVariationDTO
  indexAtt?: number
  indexOpt?: number
  typeProduct: string
}

export default function Variation({
  control,
  indexOpt,
  indexAtt,
  type,
  typeProduct,
}: VariationProps) {
  function namedField(name: string) {
    return type === 'single'
      ? `product_data.${name}`
      : `attributes.${indexAtt}.variations.${indexOpt}.${name}`
  }

  function namedFieldOrigin(name: string) {
    return type === 'single'
      ? name
      : `attributes.${indexAtt}.variations.${indexOpt}.${name}`
  }

  const isProduct = typeProduct === 'product'

  const label = type === 'product' ? 'produto' : 'serviço'

  return (
    <VariationContainer>
      <ProductVariationContent>
        <Row>
          <Col md="6" lg="6">
            {type === 'multiple' && (
              <InputControlLabel>
                <Controller
                  control={control}
                  name={namedField('name')}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <TextInput
                        placeholder="name"
                        size={'sm'}
                        error={error?.message}
                        {...field}
                      />
                    )
                  }}
                />
              </InputControlLabel>
            )}

            <Heading as="h5">Geral</Heading>

            {isProduct && (
              <ProductItem>
                <Text>SKU</Text>
                <Controller
                  control={control}
                  name={namedField('sku')}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <TextInput
                        placeholder="SKU"
                        style={{ textTransform: 'uppercase' }}
                        error={error?.message}
                        {...field}
                      />
                    )
                  }}
                />
              </ProductItem>
            )}

            <ProductItem>
              <Text>Preço</Text>
              <Controller
                control={control}
                name={namedFieldOrigin('price')}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <TextInput
                      type="number"
                      placeholder={`Preço do ${label}`}
                      error={error?.message}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  )
                }}
              />
            </ProductItem>
            {type === 'single' && (
              <ProductItem>
                <Text>Preço antigo</Text>
                <Controller
                  control={control}
                  name={'old_price'}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <TextInput
                        type="number"
                        placeholder="Preço antigo"
                        error={error?.message}
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    )
                  }}
                />
              </ProductItem>
            )}
            {type !== 'single' && (
              <>
                <ProductItem>
                  <Text>Imagem do {label}</Text>
                  <ImageWrapper>
                    <Controller
                      control={control}
                      name={namedField('image')}
                      render={({ field: { onChange, value } }) => {
                        return (
                          <UploadImage2
                            height={100}
                            defaultValue={value ? [value.picture_url] : []}
                            onImageVariation={(images) =>
                              onChange(images[0] ?? null)
                            }
                          />
                        )
                      }}
                    />
                  </ImageWrapper>
                </ProductItem>

                <ProductItem>
                  <Text>{label} disponível</Text>
                  <Controller
                    control={control}
                    name={namedField('actived')}
                    render={({ field: { onChange, ref, value } }) => {
                      return (
                        <Checkbox
                          id="actived"
                          onCheckedChange={(checked) => {
                            onChange(checked)
                          }}
                          defaultChecked={true}
                          checked={value}
                          ref={ref}
                        />
                      )
                    }}
                  />
                </ProductItem>
              </>
            )}
          </Col>
          {isProduct && (
            <Col md="6" lg="6">
              <Heading as="h5">Inventário e Envio</Heading>
              <ProductItem>
                <Text>Peso</Text>

                <Controller
                  control={control}
                  name={namedField('weight')}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <TextInput
                        type="number"
                        placeholder={`Peso do ${label}`}
                        error={error?.message}
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    )
                  }}
                />
              </ProductItem>

              <ProductItem>
                <Text>Estoque</Text>
                <Controller
                  control={control}
                  name={namedField('quantity')}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <TextInput
                        type="number"
                        error={error?.message}
                        placeholder={`Estoque do ${label}`}
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    )
                  }}
                />
              </ProductItem>

              <ProductItem>
                <Text>Dimensões</Text>

                <Controller
                  control={control}
                  name={namedField('dimensions.width')}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <TextInput
                        type="number"
                        placeholder="Largura"
                        error={error?.message}
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    )
                  }}
                />

                <Controller
                  control={control}
                  name={namedField('dimensions.length')}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <TextInput
                        type="number"
                        placeholder="Comprimento"
                        error={error?.message}
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    )
                  }}
                />

                <Controller
                  control={control}
                  name={namedField('dimensions.height')}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <TextInput
                        type="number"
                        placeholder="Altura"
                        error={error?.message}
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    )
                  }}
                />
              </ProductItem>
            </Col>
          )}

          {!isProduct && (
            <Col md="6" lg="6">
              <ProductItemTime>
                <Text>Tempo de atividade</Text>

                <Controller
                  control={control}
                  name={namedFieldOrigin('time')}
                  render={({
                    field: { onChange, name, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <SelectAdvanced
                        options={optionsTime}
                        error={error?.message}
                        placeholder="Tempo de serviço"
                        onChange={(data: any) => onChange(data.value)}
                        name={name}
                        value={optionsTime.filter((o) => o.value === value)}
                      />
                    )
                  }}
                />
              </ProductItemTime>
            </Col>
          )}
        </Row>
      </ProductVariationContent>
    </VariationContainer>
  )
}


