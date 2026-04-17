import { LabelCheckbox, SizesContainer } from './styles'
import { Text } from '@lemonade-technologies-hub-ui/react'
import { useRouter } from 'next/router'
import { useGetAllVariationsSizes } from '@/hooks/useGetAllVariationsSizes'
import { useEffect } from 'react'

export default function Sizes() {
  const router = useRouter()

  const sizePath = router.query.size ? String(router.query.size) : ''

  const { data: dataSizes, refetch: getAllVariationsColors } =
    useGetAllVariationsSizes()

  useEffect(() => {
    getAllVariationsColors()
  }, [getAllVariationsColors])

  function handleSize(size: string) {
    router.push({
      ...router,
      query: {
        ...router.query,
        size,
      },
    })
  }
  return (
    <SizesContainer>
      <ul>
        {dataSizes?.map((sz) => (
          <LabelCheckbox key={sz.size} actived={sz.size === sizePath}>
            <button onClick={() => handleSize(sz.size)}>
              <Text>
                {sz.size.charAt(0).toUpperCase() + sz.size.slice(1)} ({sz.total}
                )
              </Text>
            </button>
          </LabelCheckbox>
        ))}
      </ul>
    </SizesContainer>
  )
}
