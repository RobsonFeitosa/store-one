import { ArrowLeft, ArrowRight } from 'phosphor-react'
import { ArrowSliderContainer, BtnArrow } from './styles'

interface ArrowSliderProps {
  disabled: boolean
  left?: boolean
  onClick: (e: any) => void
}

export default function ArrowSlider({
  disabled,
  left,
  onClick,
}: ArrowSliderProps) {
  return (
    <ArrowSliderContainer>
      <BtnArrow
        onClick={onClick}
        style={{ opacity: disabled ? '0.3' : 1 }}
        isRight={!left}
        disabled={disabled}
      >
        {left ? <ArrowLeft size={22} /> : <ArrowRight size={22} />}
      </BtnArrow>
    </ArrowSliderContainer>
  )
}
