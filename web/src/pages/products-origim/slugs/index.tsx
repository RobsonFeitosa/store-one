import MainLayout from '@/components/components/Layout/Main'
import { Container } from 'react-bootstrap'
import { useGetProduct } from '@/hooks/useGetProduct'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Heading,
  Text,
} from '@lemonade-technologies-hub-ui/react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog"
import formatValue from '@/utils/formatValue'
import QuantityProduct from '@/components/QuantityProduct'
import WishProduct from '@/components/ProductBox/WishProduct'
import { useOrder } from '@/hooks/providers/order'
import ProductsGallery from '@/components/ProductsGallery'
import QueryPriceFrete from './QueryPriceFrete'
import ProductsRelated from './ProductsRelated'
import DescriptionsWrapper from './DescriptionsWrapper'
import Schedule from './Schedule'
import { Calendar, Lightning } from 'phosphor-react'
import LoadingProductOrigim from './LoadingProductOrigim'
import { IProductDTO } from '@/pages/dtos/product.dto'
import CheckoutService from './CheckoutService'
import SimulatePayment from '@/pages/checkout/SimulatePayment'
import { Option } from '@/dtos'
import { AccessAccountModal } from '@/components/AccessAccountModal'
import ForgotRequest from '@/pages/signin/ForgotRequest'
import { useAuth } from '@/hooks/providers/auth'
import discountPrice from '@/components/ProductBox/discountPrice'
import TimeDiscount from '@/components/ProductBox/TimeDiscount'
import { IVariationDTO } from '@/pages/dtos/variation.dto'

import {
  AddToCartWrapper,
  AttributeWrapper,
  BtnAddToCart,
  BtnVariation,
  BtnsCart,
  CategoriesWrapper,
  DataWrapper,
  Description,
  DescriptionWrapper,
  DiscountOff,
  DisplayImage,
  DisplayImagesProduct,
  OldPrice,
  Price,
  PriceWrapper,
  ProductContainer,
  ProductContent,
  ProductsRelatedWrapper,
  QueryFrete,
  SummaryProduct,
  VariantionWrapper,
  VariationPriceWrapper,
  WishContent,
  WrapperHeader,
} from './styles'

interface VariationsTarget {
  name: string
  variationTarget: string
}

interface ProductProps {
  slug: string
  id: string
  isProduct: boolean
  initialProduct: IProductDTO
}

export default function Slugs({
  slug,
  isProduct,
  initialProduct,
  id,
}: ProductProps) {
  const router = useRouter()
  const { addOrder } = useOrder()
  const [onQty, setOnQty] = useState(1)
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [SKU, setSKU] = useState('')
  const [priceTarget, setPriceTarget] = useState(0)
  const [product, setProduct] = useState<IProductDTO>(initialProduct)
  const [variations, setVariations] = useState<VariationsTarget[]>(() => {
    if (!product.attributes) {
      return []
    }

    return product.attributes.map((attr) => {
      return {
        name: attr.name,
        variationTarget: attr.variations[0].name ?? '',
      }
    })
  })

  const { data: productData, refetch: getProduct } = useGetProduct(slug, id)

  useEffect(() => {
    getProduct()

    return () => {
      setLoading(true)
      setProduct({} as IProductDTO)
    }
  }, [slug, id, getProduct])

  useEffect(() => {
    if (productData) {
      setProduct(productData)
      setTimeout(() => {
        setLoading(false)
      }, 300)

      if (productData.mode_data === 'single') {
        const price = discountPrice(
          productData.price,
          productData.time_discount?.discount ?? 0,
        )

        setPriceTarget(price)
        setSKU(productData.product_data?.sku ?? '')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productData])

  useEffect(() => {
    if (product.mode_data === 'single') {
      const price = discountPrice(
        product.price,
        product.time_discount?.discount ?? 0,
      )

      setPriceTarget(price)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function defineQty(qty: number) {
    setOnQty(qty)
  }

  function handleAddToCart() {
    if (product) {
      addOrder(
        {
          id: product.id,
          name: product.name,
          pictureUrl: product.images ? product.images[0].picture_url : '',
          quantity: onQty,
          slug: product.slug,
          price: priceTarget,
          typeProduct: isProduct ? 'product' : 'service',
          variations: variations.map((v) => v.variationTarget),
        },
        onQty,
        priceTarget,
      )
    }
  }

  function handleBuyNow() {
    if (product) {
      addOrder(
        {
          id: product.id,
          name: product.name,
          pictureUrl: product.images ? product.images[0].picture_url : '',
          quantity: onQty,
          slug: product.slug,
          price: priceTarget,
          typeProduct: isProduct ? 'product' : 'service',
          variations: variations.map((v) => v.variationTarget),
        },
        onQty,
        priceTarget,
      )
      router.push('/checkout')
    }
  }

  const [isDateSelected, setIsDateSelected] = useState(false)

  function handleClose() {
    setOpenModal(false)
    setIsDateSelected(false)
  }

  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)

  function onSelectedDateTime(time: Date | null) {
    setSelectedDateTime(time)
  }

  const [openModalCheckout, setOpenModalCheckout] = useState(false)

  function onCheckoutModal(open: boolean) {
    setOpenModalCheckout(open)
  }

  const [professionalSelected, setProfessionalSelected] =
    useState<Option | null>(null)

  function onProfessional(option: Option) {
    setProfessionalSelected(option)
  }

  const [openModalSimulate, setOpenModalSimulate] = useState(false)

  function onFinishCheckout() {
    setOpenModalSimulate(true)
    setOpenModalCheckout(false)
  }

  const [openForgotSend, setOpenForgotSend] = useState(false)
  const [openModalAccount, setOpenModalAccount] = useState(false)

  const { user } = useAuth()

  function seeAvailability() {
    if (!user) {
      setOpenModalAccount(true)
    } else {
      setOpenModal(true)
    }
  }

  function onScheduleGoBack() {
    setOpenModal(true)
  }

  const isPromotion = !!product.time_discount

  function handleVariation(attribute: string, variation: string | undefined) {
    if (variation) {
      setVariations((state) => {
        for (const st of state) {
          if (st.name === attribute) {
            return [
              {
                name: st.name,
                variationTarget:
                  st.variationTarget === variation ? 'null' : variation,
              },
            ]
          }
        }
        return [...state]
      })
    }
  }

  useEffect(() => {
    variations.forEach((variation, index) => {
      if (
        product.attributes &&
        variation.name === product.attributes[index].name
      ) {
        const vars = product.attributes[index].variations.map((v) => v)

        vars.forEach((v) => {
          if (variation.variationTarget === v.name) {
            const price = discountPrice(
              v.price ?? 0,
              product.time_discount?.discount ?? 0,
            )

            setPriceTarget(isPromotion ? price : v.price ?? 0)
            if (v.sku) {
              setSKU(v.sku)
            }
          }
        })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variations])

  function getPriceVariation(
    attrVariations: IVariationDTO[],
    attributeTarget: string,
  ) {
    const variationTarget = variations.find((v) => v.name === attributeTarget)
      ?.variationTarget

    const newPrice = attrVariations.find((v) => v.name === variationTarget)
      ?.price

    const priceDiscounted = discountPrice(
      newPrice ?? 0,
      product.time_discount?.discount ?? 0,
    )

    return isPromotion ? priceDiscounted : newPrice ?? 0
  }

  function getOldPriceVariation(
    attrVariations: IVariationDTO[],
    attributeTarget: string,
  ) {
    const variationTarget = variations.find((v) => v.name === attributeTarget)
      ?.variationTarget

    const newPrice = attrVariations.find((v) => v.name === variationTarget)
      ?.price

    return formatValue(newPrice ?? 0)
  }

  function isVariationTarget(
    attrVariations: IVariationDTO[],
    attributeName: string,
  ) {
    return attrVariations
      .map((v) => v.name)
      .includes(
        variations.find((v) => v.name === attributeName)?.variationTarget,
      )
  }

  return (
    <>
      <Dialog open={openModalAccount} onOpenChange={setOpenModalAccount}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Acessar conta</DialogTitle>
          </DialogHeader>
          <AccessAccountModal
            onOpenForgotModal={() => setOpenForgotSend(true)}
            onClose={() => setOpenModalAccount(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openForgotSend} onOpenChange={setOpenForgotSend}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Esqueci minha senha</DialogTitle>
          </DialogHeader>
          <ForgotRequest onClose={() => setOpenForgotSend(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={openModalSimulate} onOpenChange={setOpenModalSimulate}>
        <DialogContent>
          <SimulatePayment onClose={() => setOpenModalSimulate(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={openModalCheckout} onOpenChange={setOpenModalCheckout}>
        <DialogContent className="max-w-[810px] p-0 overflow-hidden">
          <CheckoutService
            selectedDateTime={selectedDateTime}
            onClose={() => setOpenModalCheckout(false)}
            product={product}
            onScheduleGoBack={onScheduleGoBack}
            professionalSelected={professionalSelected}
            onFinishCheckout={onFinishCheckout}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openModal} onOpenChange={(open) => {
        setOpenModal(open)
        if (!open) setIsDateSelected(false)
      }}>
        <DialogContent className={`${isDateSelected ? 'max-w-[810px]' : 'max-w-[590px]'} overflow-hidden p-4`}>
          <Schedule
            onClose={handleClose}
            onSelectedDateTime={onSelectedDateTime}
            onCheckoutModal={onCheckoutModal}
            onProfessionalOption={onProfessional}
            onDateSelected={setIsDateSelected}
          />
        </DialogContent>
      </Dialog>

      <MainLayout onHeader title={product?.name} isLoading={loading}>
        <ProductContainer>
          <Container>
            {loading ? (
              <LoadingProductOrigim />
            ) : (
              <>
                {product && (
                  <ProductContent>
                    <DisplayImage>
                      <DisplayImagesProduct>
                        {product.time_discount && (
                          <DiscountOff>
                            <Text size={'lg'}>
                              {product.time_discount?.discount}%
                              <Text as="span">OFF</Text>
                            </Text>
                          </DiscountOff>
                        )}
                        {product.images && (
                          <ProductsGallery images={product.images} />
                        )}
                      </DisplayImagesProduct>
                    </DisplayImage>

                    <DescriptionWrapper>
                      <SummaryProduct>
                        <WrapperHeader>
                          <Heading as="h3">{product.name}</Heading>

                          <Text>SKU: {SKU}</Text>
                        </WrapperHeader>

                        <PriceWrapper>
                          {isPromotion && (
                            <TimeDiscount
                              size={'xs'}
                              deadline={
                                product.time_discount?.endDate.toString() ?? ''
                              }
                              timeY={false}
                              isLineX
                            />
                          )}

                          {product.mode_data !== 'multiple' && (
                            <>
                              {product.price !== null && (
                                <Price
                                  as="span"
                                  size="lg"
                                  isPromotion={isPromotion}
                                >
                                  {isPromotion && <Lightning size={18} />}
                                  {formatValue(priceTarget)}
                                </Price>
                              )}
                              {product.old_price && (
                                <OldPrice as="small" size="sm">
                                  {formatValue(product.old_price)}
                                </OldPrice>
                              )}
                            </>
                          )}
                        </PriceWrapper>

                        {(product.product_data?.weight ||
                          product.product_data?.dimensions) && (
                            <DataWrapper>
                              {product.product_data?.weight && (
                                <Text>Peso: {product.product_data.weight}kg</Text>
                              )}
                              {product.product_data?.dimensions && (
                                <Text>
                                  Dimensões:{' '}
                                  {product.product_data.dimensions.width}x
                                  {product.product_data.dimensions.height}x
                                  {product.product_data.dimensions.length}cm
                                </Text>
                              )}
                            </DataWrapper>
                          )}

                        <Description>
                          {product.short_description && (
                            <Text
                              className="content"
                              dangerouslySetInnerHTML={{
                                __html: product.short_description,
                              }}
                            />
                          )}
                        </Description>

                        {product.attributes &&
                          product.attributes?.length > 0 && (
                            <VariantionWrapper>
                              {product.attributes?.map((attribute) => (
                                <AttributeWrapper key={attribute.id}>
                                  <Heading as="h4">{attribute.name}</Heading>

                                  {attribute.variations.map(
                                    (variation) =>
                                      variation.name && (
                                        <BtnVariation
                                          key={variation.id}
                                          actived={
                                            variations.find(
                                              (vt) =>
                                                vt.name === attribute.name,
                                            )?.variationTarget ===
                                            variation.name
                                          }
                                          onClick={() =>
                                            handleVariation(
                                              attribute.name,
                                              variation.name,
                                            )
                                          }
                                        >
                                          {variation.name
                                            .charAt(0)
                                            .toUpperCase() +
                                            variation.name.slice(1)}
                                        </BtnVariation>
                                      ),
                                  )}

                                  {isVariationTarget(
                                    attribute.variations,
                                    attribute.name,
                                  ) && (
                                      <VariationPriceWrapper>
                                        <Price
                                          as="span"
                                          size="lg"
                                          isPromotion={isPromotion}
                                        >
                                          {isPromotion && <Lightning size={18} />}

                                          {formatValue(
                                            getPriceVariation(
                                              attribute.variations,
                                              attribute.name,
                                            ),
                                          )}
                                        </Price>

                                        {isPromotion && (
                                          <OldPrice as="small" size="sm">
                                            {getOldPriceVariation(
                                              attribute.variations,
                                              attribute.name,
                                            )}
                                          </OldPrice>
                                        )}
                                      </VariationPriceWrapper>
                                    )}
                                </AttributeWrapper>
                              ))}
                            </VariantionWrapper>
                          )}

                        <AddToCartWrapper>
                          {isProduct && (
                            <QuantityProduct onDefineQty={defineQty} />
                          )}

                          <BtnsCart>
                            {!isProduct ? (
                              <BtnAddToCart onClick={seeAvailability}>
                                <Calendar size={22} />
                                Ver disponabilidades
                              </BtnAddToCart>
                            ) : (
                              <>
                                <BtnAddToCart onClick={handleAddToCart}>
                                  Adicionar ao carrinho
                                </BtnAddToCart>
                                <BtnAddToCart onClick={handleBuyNow}>
                                  Comprar agora
                                </BtnAddToCart>
                              </>
                            )}
                          </BtnsCart>
                        </AddToCartWrapper>

                        <WishContent>
                          <WishProduct
                            productId={product.id}
                            label="Adicionar a lista de desejos"
                          />
                        </WishContent>

                        {product.categories_items.length > 0 && (
                          <CategoriesWrapper>
                            <Text>Categorias: </Text>
                            {product.categories_items.map((category, index) => (
                              <div key={category.id}>
                                <Text as="strong">
                                  {category.name}
                                  {index <
                                    product.categories_items.length - 1 && ','}
                                </Text>
                              </div>
                            ))}
                          </CategoriesWrapper>
                        )}

                        {isProduct && (
                          <QueryFrete>
                            <Text>Consultar frete e prazo de entrega</Text>
                            <QueryPriceFrete />
                          </QueryFrete>
                        )}
                      </SummaryProduct>
                    </DescriptionWrapper>
                  </ProductContent>
                )}
              </>
            )}
          </Container>

          <DescriptionWrapper>
            <DescriptionsWrapper isProduct={isProduct} product={product} />
          </DescriptionWrapper>

          <ProductsRelatedWrapper>
            <Container>
              <Heading>
                {isProduct ? 'Produtos' : 'Serviços'} relacionado
              </Heading>
            </Container>
            <ProductsRelated />
          </ProductsRelatedWrapper>
        </ProductContainer>
      </MainLayout>
    </>
  )
}
