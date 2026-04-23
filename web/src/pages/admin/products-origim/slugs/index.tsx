/* eslint-disable react-hooks/exhaustive-deps */
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import 'react-quill/dist/quill.snow.css'

import AdminLayout from '@/components/components/Layout/Admin'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import {
  Button,
  Heading,
  Text,
  TextInput,
} from '@lemonade-technologies-hub-ui/react'
import { useGetProduct } from '@/hooks/useGetProduct'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import ProductData from './ProductData'
import { useCreateProduct } from './hooks/useCreateProduct'
import { IProductDTO } from '@/pages/dtos/product.dto'
import formatDate from '@/utils/formatDate'
import Images from './Images'
import Categories from './categories'
import { useUpdateProduct } from './hooks/useUpdateProduct'
import { Check, Copy, Eye } from 'phosphor-react'
import { useSoftDeleteProduct } from './hooks/useSoftDeleteProduct'
import { useDeleteProdutOfTimeDiscount } from '../../hooks/useDeleteProdutOfTimeDiscount'
import { useToast } from '@/hooks/providers/toast'
import { useGetAllCategories } from '../../hooks/useGetAllCategories'

import {
  BtnCopy,
  BtnGoTrash,
  BtnRestore,
  BtnSaveDraft,
  CategoriesWrapper,
  CropText,
  Form,
  HeaderGoToProductView,
  ImageWrapper,
  ProductContainer,
  ProductWrapper,
  PublisherWrapper,
  SideWrapper,
  TagsWrapper,
  TimeDiscount,
  ViewLink,
  ViewersWrapper,
  WrapperBtns,
  WrapperShortDescription,
  WrappersText,
} from './styles'
import publishedLabel from '../../utils/publishedLabel'
import visibilityLabel from '../../utils/visibilityLabel'

const attributesForm = z
  .array(
    z.object({
      id: z.string().optional(),
      name: z.string(),
      options: z.array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      ),
      variations: z.array(
        z.object({
          id: z.string().optional(),
          name: z.string().optional(),
          price: z.number().optional(),
          quantity: z.number().nullable().optional(),
          time: z.string().nullable().optional(),
          weight: z.number().nullable().optional(),
          sku: z.string().nullable().optional(),
          actived: z.boolean().optional().default(true),
          image: z.any().optional(),
          dimensions: z
            .object({
              width: z.number().nullable().optional(),
              length: z.number().nullable().optional(),
              height: z.number().nullable().optional(),
            })
            .nullable()
            .optional(),
        }),
      ),
    }),
  )
  .optional()

const productForm = z
  .object({
    name: z.string(),
    description: z.string().nullable(),
    short_description: z.string().nullable(),
    price: z.number().nullable().optional(),
    old_price: z.number().nullable().optional(),
    type: z.string().optional(),
    published: z.string().default('draft').optional(),
    categories: z.array(z.string().optional()).optional(),
    visibility: z.string().default('public').optional(),
    mode_data: z.string(),
    time: z.string().nullable().optional(),
    images: z
      .array(
        z.object({
          id: z.number().optional(),
          path: z.string(),
          file: z.any(),
        }),
      )
      .optional(),
    product_data: z
      .object({
        id: z.string().optional(),
        quantity: z.number().nullable().optional(),
        sku: z.string().nullable().optional(),
        weight: z.number().nullable().optional(),
        dimensions: z.object({
          width: z.number().nullable().optional(),
          length: z.number().nullable().optional(),
          height: z.number().nullable().optional(),
        }),
      })
      .optional(),
    attributes: attributesForm,
  })
  .superRefine(({ attributes, mode_data }, ctx) => {
    if (
      mode_data === 'multiple' &&
      attributes &&
      attributes[0]?.options?.length === 0
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['mode_data'],
        message: 'É necessário ter mais de um atributo',
      })
    }
  })

export type AttributesFormData = z.infer<typeof attributesForm>
export type ProductFormData = z.infer<typeof productForm>

interface ProductProps {
  slug: string
  id: string
  type: string
  user: string
}

const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {
  ssr: false,
})

export default function Slugs({ slug, id, type }: ProductProps) {
  const isNew = slug === 'new' && id === '1'
  const { addToast } = useToast()

  const [product, setProduct] = useState<IProductDTO | null>(null)

  const { data: productData, refetch: getProduct } = useGetProduct(slug, id)

  const methods = useForm<ProductFormData>({
    resolver: zodResolver(productForm),
    defaultValues: {
      images: [],
      mode_data: 'single',
      attributes: [
        {
          name: '',
          options: [],
          variations: [],
        },
      ],
      product_data: {
        dimensions: {
          width: 0,
          height: 0,
          length: 0,
        },
      },
    },
  })

  const {
    setValue,
    handleSubmit,
    watch,
    register,
    control,
    formState: { errors, isDirty },
  } = methods

  const { mutateAsync: createProductAsync } = useCreateProduct()

  const { isLoading: isLoadingUpdate, mutateAsync: updateProductAsync } =
    useUpdateProduct(id)

  function buildLabelOptionsVar(data: ProductFormData) {
    const payload = data

    return {
      ...payload,
      published: 'published',
      visibility: 'public',
      categories: payload.categories?.filter((c) => c),
      attributes: payload.attributes?.map((attr, index) => {
        return {
          ...attr,
          id:
            product?.attributes &&
            product?.attributes[index] &&
            product?.attributes[index].id,
          options: attr.options.map((opt, idx) => {
            return {
              ...opt,
              label: attr.variations
                ? attr.variations[idx].name ?? ''
                : opt.label,
              value: attr.variations
                ? attr.variations[idx].name ?? ''
                : opt.value,
            }
          }),
          variations: attr.variations?.map((variaton, idx) => {
            return {
              ...variaton,
              product_attr_id:
                product?.attributes &&
                product?.attributes[index] &&
                product?.attributes[index].id,
              id:
                product?.attributes &&
                product?.attributes[index] &&
                product?.attributes[index].variations[idx] &&
                product?.attributes[index].variations[idx].id,
            }
          }),
        }
      }),
    }
  }

  async function handleRegister(data: ProductFormData) {
    const payload = buildLabelOptionsVar(data)

    if (isNew) {
      await createProductAsync(payload)
      return
    }

    await updateProductAsync(payload)
  }

  useEffect(() => {
    if (isNew) {
      setProduct(null)
      // reset()
    } else {
      getProduct()
    }

    return () => {
      setProduct(null)
    }
  }, [isNew])

  useEffect(() => {
    if (!isLoadingUpdate && !isNew) {
      setTimeout(() => {
        getProduct()
      }, 300)
    }
  }, [isLoadingUpdate, isNew])

  // const watched = watch('categories')
  // useEffect(() => {}, [])
  // useEffect(() => {
  //   if (isNew) {
  //     if (watched) {
  //       // auto save
  //       if (watched.name?.length > 4) {
  //         const timer1 = setTimeout(() => {
  //           const {
  //             name,
  //             description,
  //             price,
  //             old_price,
  //             quantity,
  //             categories,
  //           } = watched

  //           handleRegister({
  //             description,
  //             name,
  //             price,
  //             old_price,
  //             quantity,
  //             categories,
  //           })
  //         }, 12000)

  //         return () => {
  //           clearTimeout(timer1)
  //         }
  //       }
  //     }
  //   }
  // }, [watched, isNew])

  async function handleDraftSave(data: ProductFormData) {
    if (isNew) {
      const payload = buildLabelOptionsVar(data)

      await createProductAsync({
        ...payload,
        published: 'draft',
        visibility: 'public',
      })
    }
  }

  useEffect(() => {
    if (productData && !isNew) {
      setProduct(productData)
    }
  }, [isNew, productData])

  const { data: categoriesData } = useGetAllCategories(
    { limit: 99999, page: 1 },
    product?.type ?? '',
  )

  useEffect(() => {
    setValue('name', product?.name ?? '')
    setValue('description', product?.description ?? '')
    setValue('short_description', product?.short_description ?? '')
    setValue('price', product?.price ?? undefined)
    setValue('old_price', product?.old_price ?? undefined)
    setValue('mode_data', product?.mode_data ?? '')

    setValue('time', product?.time ?? '')

    setValue('type', product?.type ?? type)

    setValue(
      'images',
      product
        ? product.images?.map((image, index) => ({
          id: index ?? 0,
          path: image.picture_url,
        }))
        : undefined,
    )

    setValue(
      'product_data',
      product?.product_data
        ? {
          ...product?.product_data,
        }
        : undefined,
    )

    setValue(
      'attributes',
      product?.attributes
        ? [...(product.attributes ?? [])]
        : [
          {
            name: '',
            options: [],
            variations: [],
          },
        ],
    )

    if (product?.categories) {
      const [categoriesRes] = categoriesData ?? []
      const categories = categoriesRes?.map((c) =>
        product?.categories?.includes(c.id) ? c.id : undefined,
      )
      setValue(
        'categories',
        categories && categories?.length > 0
          ? [...(categories ?? [])]
          : undefined,
      )
    }
  }, [product, categoriesData, setValue, id, type])

  function onRefetchProduct() {
    // getProduct()
  }

  const { mutateAsync: softDeleteProductAsync } = useSoftDeleteProduct(id)

  async function handleGoTrash() {
    await softDeleteProductAsync()
  }

  const {
    isSuccess: isSuccessDeleteProductTimeDiscount,
    mutateAsync: deleteProdutOfTimeDiscount,
  } = useDeleteProdutOfTimeDiscount(id)

  async function handleRemoveOfTimeDiscount() {
    await deleteProdutOfTimeDiscount()
  }

  useEffect(() => {
    if (isSuccessDeleteProductTimeDiscount) {
      addToast({
        type: 'success',
        title: 'Produto removido',
        description: 'Esse produto não pertence mais ao grupo de desconto',
      })
      onRefetchProduct()
    }
  }, [isSuccessDeleteProductTimeDiscount])

  const hasDiscount =
    product?.time_discount &&
    product.time_discount.status === 'actived' &&
    new Date(product.time_discount.endDate) > new Date()

  const [attributes] = watch(['attributes'])

  const [copied, setCopied] = useState(false)

  function handleCopy() {
    setCopied(true)
    if (product) {
      navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${type}s/${product.slug}/${product.id}`,
      )
    }

    setTimeout(() => {
      setCopied(false)
    }, 15000)
  }

  const label = product?.type === 'product' ? 'produto' : 'serviço'

  return (
    <AdminLayout>
      <ProductContainer>
        <ProductWrapper>
          <FormProvider {...methods}>
            <Form as="form" onSubmit={handleSubmit(handleRegister)}>
              <HeaderGoToProductView>
                <TextInput
                  placeholder={`Nome do ${label}`}
                  error={errors.name?.message}
                  {...register('name')}
                />

                {product && (
                  <ViewersWrapper>
                    <CropText>
                      <Text>
                        {`${process.env.NEXT_PUBLIC_BASE_URL}/${label}s/${product.slug}/${product.id}`}
                      </Text>
                    </CropText>

                    <div>
                      <BtnCopy type="button" onClick={handleCopy}>
                        <Text>copiar link</Text>
                        {!copied ? <Copy size={18} /> : <Check size={18} />}
                      </BtnCopy>

                      <ViewLink
                        href={`/${type}s/${product.slug}/${product.id}`}
                      >
                        <Text>visualizar</Text>
                        <Eye size={18} />
                      </ViewLink>
                    </div>
                  </ViewersWrapper>
                )}
              </HeaderGoToProductView>

              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => {
                  return (
                    <QuillNoSSRWrapper
                      theme="snow"
                      value={value ?? ''}
                      onChange={onChange}
                    />
                  )
                }}
              />

              <ProductData
                control={control}
                productId={id}
                typeProduct={product?.type ?? type}
                attributes={attributes}
                modeData={product?.mode_data ?? 'single'}
              />

              <WrapperShortDescription>
                <Heading as="h5">Curta descrição</Heading>

                <Controller
                  control={control}
                  name="short_description"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <QuillNoSSRWrapper
                        theme="snow"
                        style={{
                          border: error?.message ? '1px solid red' : 0,
                        }}
                        onChange={onChange}
                        value={value ?? ''}
                      />
                    )
                  }}
                />
              </WrapperShortDescription>
            </Form>
          </FormProvider>
        </ProductWrapper>

        <SideWrapper>
          <Form as="form" onSubmit={methods.handleSubmit(handleRegister)}>
            <PublisherWrapper>
              <WrapperBtns>
                <BtnSaveDraft
                  type="button"
                  size="xs"
                  onClick={handleSubmit(handleDraftSave)}
                >
                  Salvar rascunho
                </BtnSaveDraft>

                <BtnGoTrash size="xs" type="button" onClick={handleGoTrash}>
                  Mover pra lixeira
                </BtnGoTrash>
              </WrapperBtns>

              <WrappersText>
                <div>
                  <Text>
                    <Text as="strong">Status:</Text>{' '}
                    {publishedLabel(product?.published)}
                  </Text>
                </div>

                <div>
                  <Text>
                    <Text as="strong">Visibilidade:</Text>{' '}
                    {visibilityLabel(product?.visibility)}
                  </Text>
                </div>

                {product?.created_at && (
                  <Text>
                    Criação:{' '}
                    {formatDate({ date: product.created_at, hoursView: true })}h
                  </Text>
                )}
              </WrappersText>

              {product?.deleted_at && (
                <div>
                  <Text>{label} na lixeira</Text>

                  <BtnRestore type="button" size="sm" onClick={handleGoTrash}>
                    Restaurar
                  </BtnRestore>
                </div>
              )}

              <Button type="submit" size="sm" disabled={!isDirty}>
                {slug !== 'new' ? (
                  <>
                    {product?.published !== 'draft' ? 'Atualizar' : 'publicar'}
                  </>
                ) : (
                  'Publicar'
                )}
              </Button>
            </PublisherWrapper>

            <ImageWrapper>
              <Images control={control} type={type} />
            </ImageWrapper>
          </Form>

          {product?.time_discount && hasDiscount && (
            <TimeDiscount>
              <Heading as="h3">Desconto temporal aplicado</Heading>
              <hr />
              <Text>{product.time_discount.discount}% desconto</Text>
              <Text>
                Início:{' '}
                {formatDate({
                  date: product.time_discount.startDate,
                  hoursView: true,
                })}
              </Text>
              <Text>
                Fim:
                {formatDate({
                  date: product.time_discount.endDate,
                  hoursView: true,
                })}
                <Button
                  type="button"
                  size="sm"
                  onClick={handleRemoveOfTimeDiscount}
                >
                  Sair do desconto
                </Button>
              </Text>
            </TimeDiscount>
          )}

          <CategoriesWrapper>
            <Categories type={type} control={control} />
          </CategoriesWrapper>

          <TagsWrapper style={{ display: 'none' }}>
            <span>Tags do produto</span>
          </TagsWrapper>
        </SideWrapper>
      </ProductContainer>
    </AdminLayout>
  )
}
