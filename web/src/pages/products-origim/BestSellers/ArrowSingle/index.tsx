import { CaretLeft, CaretRight } from 'phosphor-react'
import { ArrowSingleContainer, BtnArrow } from './styles'

interface ArrowSingleProps {
  disabled: boolean
  left?: boolean
  onClick: (e: any) => void
}

export default function ArrowSingle({
  disabled,
  left,
  onClick,
}: ArrowSingleProps) {
  return (
    <ArrowSingleContainer>
      <BtnArrow
        onClick={onClick}
        style={{ opacity: disabled ? '0.3' : 1 }}
        disabled={disabled}
      >
        {left ? <CaretLeft size={16} /> : <CaretRight size={16} />}
      </BtnArrow>
    </ArrowSingleContainer>
  )
}
