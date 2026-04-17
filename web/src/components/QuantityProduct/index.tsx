import { TextInput } from '@lemonade-technologies-hub-ui/react'
import { BtnDecreaseIncrease, QuantityContainer } from './styles'
import { ChangeEvent, useState } from 'react'

interface QuantityProductProps {
  initial?: number
  size?: 'sm'
  onDefineQty?(qty: number): void
  onChangeQty?(qty: number): void
}

export default function QuantityProduct({
  initial,
  size,
  onDefineQty,
  onChangeQty,
}: QuantityProductProps) {
  const [qty, setQty] = useState(initial ?? 1)

  function handleDecrease() {
    setQty((state) => (state > 1 ? state - 1 : state))
    onChangeQty && onChangeQty(qty > 1 ? qty - 1 : qty)
  }

  function handleIncrease() {
    setQty((state) => state + 1)
    onChangeQty && onChangeQty(qty + 1)
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const valueTarget = Number(e.target.value)

    const value = valueTarget !== 0 ? valueTarget : 1

    setQty(value)
    onChangeQty && onChangeQty(value)
  }

  onDefineQty && onDefineQty(qty)

  // useEffect(() => {
  //   onDefineQty(qty)
  // }, [qty, onDefineQty])

  return (
    <QuantityContainer size={size}>
      <BtnDecreaseIncrease onClick={handleDecrease}>-</BtnDecreaseIncrease>
      <TextInput onChange={handleChange} type="number" value={qty} />
      <BtnDecreaseIncrease onClick={handleIncrease}>+</BtnDecreaseIncrease>
    </QuantityContainer>
  )
}
