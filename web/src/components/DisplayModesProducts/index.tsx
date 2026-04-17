import { List, ListBullets, SquaresFour } from 'phosphor-react'
import { SelectAdvanced, Text } from '@lemonade-technologies-hub-ui/react'
import { useRouter } from 'next/router'

import {
  BtnShowGrid,
  ModeGrid,
  SelectedBox,
  ShortProducts,
  DisplayModesProductsContainer,
  Total,
} from './styles'

export type GridMode = 'grid' | 'gridlist' | 'list'

interface DisplayModesProductsProps {
  onMode: (mode: GridMode) => void
  mode: GridMode
  total: number
  isProduct: boolean
}

export default function DisplayModesProducts({
  onMode,
  mode,
  total,
  isProduct,
}: DisplayModesProductsProps) {
  function handleSwitchGrid(mode: GridMode) {
    onMode(mode)
  }

  const router = useRouter()

  function handleOrder(value: string) {
    const orders = [
      'onlyDiscount',
      'alphabeticalDESC',
      'alphabeticalASC',
      'highPrice',
      'lowPrice',
    ]

    for (const order of orders) {
      delete router.query[order]
    }

    if (value !== 'null') {
      router.query[value] = 'true'
    }

    router.push({
      ...router,
      query: {
        ...router.query,
      },
    })
  }

  return (
    <DisplayModesProductsContainer>
      <ModeGrid>
        <div>
          <BtnShowGrid
            actived={mode === 'grid'}
            onClick={() => handleSwitchGrid('grid')}
          >
            <SquaresFour size={28} />
          </BtnShowGrid>
          <BtnShowGrid
            actived={mode === 'gridlist'}
            onClick={() => handleSwitchGrid('gridlist')}
          >
            <ListBullets size={28} />
          </BtnShowGrid>
          <BtnShowGrid
            actived={mode === 'list'}
            onClick={() => handleSwitchGrid('list')}
          >
            <List size={28} />
          </BtnShowGrid>
        </div>
      </ModeGrid>

      <ShortProducts>
        <Text>Ordenar por:</Text>

        <SelectedBox>
          <SelectAdvanced
            size="sm"
            onChange={(data: any) => handleOrder(data.value)}
            defaultValue={[
              {
                label: 'Lançamentos',
                value: 'null',
              },
            ]}
            options={[
              {
                label: 'Lançamentos',
                value: 'null',
              },
              {
                label: 'Descontos',
                value: 'onlyDiscount',
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
            ]}
            name={'sdf'}
          />
        </SelectedBox>
        <Total>
          <Text>
            {total} {isProduct ? 'produtos' : 'serviços'}
          </Text>
        </Total>
      </ShortProducts>
    </DisplayModesProductsContainer>
  )
}
