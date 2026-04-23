import AdminLayout from '@/components/components/Layout/Admin'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/providers/auth'
import { useRouter } from 'next/router'
import { useGetTimeDiscount } from '../../hooks/useGetTimeDiscount'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Trash } from 'phosphor-react'
import { Dialog, DialogRoot, Text } from '@lemonade-technologies-hub-ui/react'
import Link from 'next/link'
import formatDate from '@/utils/formatDate'
import { useDeleteTimeDiscount } from '../../hooks/useDeleteTimeDiscount'
import FormTimeDiscount from '../FormTimeDiscount'
import { useGetProductsTimeDiscountOptions } from '../../hooks/useGetProductsTimeDiscountOptions'
import Status from '../TimeDiscountContent/Status'

import {
  BtnEditTimeDiscount,
  BtnRemoveTimeDiscount,
  ProductSingle,
  ProductsWrapper,
  TimeDiscountContainer,
  TimeDiscountContent,
  TimeDiscountHeader,
  WrapperDates,
} from './styles'

interface TimeDiscountProps {
  id: string
}

export default function TimeDiscount({ id }: TimeDiscountProps) {
  const { user } = useAuth()
  const [openModal, setOpenModal] = useState(false)
  const router = useRouter()

  const { data: timeDiscount, refetch: getTimeDiscount } =
    useGetTimeDiscount(id)

  const { data: optionsProductsData, refetch: getOptionsProductsTimeDiscount } =
    useGetProductsTimeDiscountOptions()

  const { isSuccess: isSuccessDelete, mutateAsync: deleteTimeDiscountAsync } =
    useDeleteTimeDiscount(id)

  function handleEditTimeDiscount() {
    setOpenModal(true)
  }

  async function handleRemoveTimeDiscount() {
    await deleteTimeDiscountAsync()
  }

  useEffect(() => {
    user && getOptionsProductsTimeDiscount()
  }, [user, getOptionsProductsTimeDiscount])

  function onRefetch() {
    getTimeDiscount()
    getOptionsProductsTimeDiscount()
  }

  useEffect(() => {
    if (isSuccessDelete) {
      router.push('/products/time-discounts')
    }
  }, [isSuccessDelete, router])

  useEffect(() => {
    user && getTimeDiscount()
  }, [user, getTimeDiscount])

  return (
    <>
      <DialogRoot open={openModal}>
        <Dialog offClosed title="Atualizar desconto">
          <FormTimeDiscount
            optionsProducts={optionsProductsData}
            timeDiscount={timeDiscount}
            onClose={() => setOpenModal(false)}
            onRefetch={onRefetch}
          />
        </Dialog>
      </DialogRoot>
      <AdminLayout>
        <TimeDiscountContainer>
          {timeDiscount ? (
            <TimeDiscountContent>
              <BtnEditTimeDiscount onClick={handleEditTimeDiscount}>
                editar
              </BtnEditTimeDiscount>
              <BtnRemoveTimeDiscount onClick={handleRemoveTimeDiscount}>
                <Trash size={23} /> excluir
              </BtnRemoveTimeDiscount>
              <TimeDiscountHeader>
                <Link href={`/products/time-discounts/${timeDiscount.id}`}>
                  <Text as="strong">{timeDiscount.id.slice(0, 11)}</Text>
                </Link>

                <div>
                  <Status status={timeDiscount.status} />
                  <Text>{timeDiscount.discount}%</Text>
                </div>
              </TimeDiscountHeader>
              <ProductsWrapper>
                <Text>Produtos relacionado:</Text>
                {timeDiscount.products?.map((product: any) => (
                  <ProductSingle key={product.id}>{product.name}</ProductSingle>
                ))}
              </ProductsWrapper>
              <WrapperDates>
                <Text>
                  {formatDate({
                    date: timeDiscount.startDate,
                    hoursView: true,
                  })}
                  h
                </Text>
                <Text>
                  {formatDate({ date: timeDiscount.endDate, hoursView: true })}h
                </Text>
              </WrapperDates>
            </TimeDiscountContent>
          ) : (
            <div>
              <span>sem fornecedor</span>
            </div>
          )}
        </TimeDiscountContainer>
      </AdminLayout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string

  return {
    props: {
      id,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
