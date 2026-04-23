/* eslint-disable react-hooks/exhaustive-deps */
import { Faders } from 'phosphor-react'
import {
  Dialog,
  DialogRoot,
  SelectAdvanced,
  Text,
} from '@lemonade-technologies-hub-ui/react'
import FilterProducts from '../FilterProducts'
import SearchProducts from './SearchProducts'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useGetAllProducts } from '@/hooks/useGetAllProducts'
import { TypeProduct } from '@/pages/dtos/product.dto'

import {
  SelectedBox,
  ShortProducts,
  DisplayModesProductsContainer,
  Total,
  FilterAdvanced,
  QuerysSearch,
  BtnFilterAdv,
} from './styles'

const optionsOrder = [
  {
    label: 'Lançamentos',
    value: 'current',
  },
  {
    label: 'Order alfabetica, A-Z',
    value: 'alphabeticalASC',
  },
  {
    label: 'Order alfabetica, Z-A',
    value: 'alphabeticalDESC',
  },
  {
    label: 'Preço, valor mais alto',
    value: 'highPrice',
  },
  {
    label: 'Preço, valor mais baixo',
    value: 'lowPrice',
  },
  {
    label: 'Data, mais antigo',
    value: 'old',
  },
  {
    label: 'Data, mais atual',
    value: 'current',
  },
]

interface QueriesOrdersProps {
  current?: boolean
  name?: string
  alphabeticalASC?: boolean
  alphabeticalDESC?: boolean
  highPrice?: boolean
  lowPrice?: boolean
  old?: boolean
  type?: TypeProduct
}

export type GridMode = 'grid' | 'gridlist' | 'list'

interface DisplayModesProductsProps {
  total: number
  type: TypeProduct
}

export default function DisplayModesProducts({
  total,
  type,
}: DisplayModesProductsProps) {
  const [openModal, setOpenModal] = useState(false)

  function handleFilterAdvanced() {
    setOpenModal(true)
  }

  const router = useRouter()

  const name = router.query.name ? String(router.query.name) : undefined
  const current = router.query.current
    ? Boolean(router.query.current)
    : undefined
  const alphabeticalASC = router.query.alphabeticalASC
    ? Boolean(router.query.alphabeticalASC)
    : undefined
  const alphabeticalDESC = router.query.alphabeticalDESC
    ? Boolean(router.query.alphabeticalDESC)
    : undefined
  const highPrice = router.query.highPrice
    ? Boolean(router.query.highPrice)
    : undefined
  const lowPrice = router.query.lowPrice
    ? Boolean(router.query.lowPrice)
    : undefined
  const old = router.query.old ? Boolean(router.query.old) : undefined

  const hasQueries = Object.keys(router.query).length > 0

  const [orderCurrent, setOrderCurrent] = useState<string>('')

  function handleOrderChange(event: any) {
    if (event) {
      setOrderCurrent(event.value)
    } else {
      router.push('/products')
      setOrderCurrent('')
    }
  }
  const [queries, setQueries] = useState<QueriesOrdersProps | null>({ type })

  const { refetch: getProducts } = useGetAllProducts({
    options: {
      limit: 999999,
      page: 1,
    },
    type,
    ...queries,
  })

  useEffect(() => {
    setQueries({
      current,
      name,
      alphabeticalASC,
      alphabeticalDESC,
      highPrice,
      lowPrice,
      old,
      type,
    })

    return () => {
      setQueries(null)
    }
  }, [
    current,
    name,
    alphabeticalASC,
    alphabeticalDESC,
    highPrice,
    lowPrice,
    old,
    type,
  ])

  const getTrueKey = (obj: any) => {
    for (const key in obj) {
      if (obj[key]) return key
    }
    return undefined
  }

  useEffect(() => {
    if (queries) {
      const item = getTrueKey(queries)
      getProducts()

      if (item) {
        setOrderCurrent(item)
      }
    }
  }, [queries])

  return (
    <>
      <DialogRoot open={openModal}>
        <Dialog offClosed title="Filtro avançado">
          <FilterProducts type={type} onClose={() => setOpenModal(false)} />
        </Dialog>
      </DialogRoot>

      <DisplayModesProductsContainer>
        <QuerysSearch>
          <SearchProducts type={type} />

          <FilterAdvanced>
            <BtnFilterAdv
              onClick={handleFilterAdvanced}
              hasQueries={hasQueries}
            >
              <Faders size={22} />
            </BtnFilterAdv>
          </FilterAdvanced>
        </QuerysSearch>

        <ShortProducts>
          <Text>Ordenar por:</Text>

          <SelectedBox>
            <SelectAdvanced
              size="sm"
              value={optionsOrder.filter((opt) => opt.value === orderCurrent)}
              defaultValue={[
                {
                  label: 'Lançamentos',
                  value: 'current',
                },
              ]}
              placeholder="Seleciona uma ordem"
              options={optionsOrder}
              onChange={handleOrderChange}
              name="orderby"
            />
          </SelectedBox>
          <Total>
            <Text>
              {total} {type === 'product' ? 'produtos' : 'serviços'}
            </Text>
          </Total>
        </ShortProducts>
      </DisplayModesProductsContainer>
    </>
  )
}
