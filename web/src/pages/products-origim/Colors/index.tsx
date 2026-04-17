import { ColorsContainer, LabelCheckbox } from './styles'
import { Text } from '@lemonade-technologies-hub-ui/react'
import { useGetAllVariationsColors } from '@/hooks/useGetAllVariationsColors'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Colors() {
  const router = useRouter()

  const colorPath = router.query.color ? String(router.query.color) : ''

  const { data: dataColors, refetch: getAllVariationsColors } =
    useGetAllVariationsColors()

  useEffect(() => {
    getAllVariationsColors()
  }, [getAllVariationsColors])

  function handleColor(color: string) {
    router.push({
      ...router,
      query: {
        ...router.query,
        color,
      },
    })
  }

  return (
    <ColorsContainer>
      <ul>
        {dataColors?.map((color) => (
          <LabelCheckbox key={color.color} actived={color.color === colorPath}>
            <button onClick={() => handleColor(color.color)}>
              <Text>
                {color.color.charAt(0).toUpperCase() + color.color.slice(1)} (
                {color.total})
              </Text>
            </button>
          </LabelCheckbox>
        ))}
      </ul>
    </ColorsContainer>
  )
}
