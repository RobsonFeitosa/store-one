import { Lightning } from 'phosphor-react'
import { Text } from '@lemonade-technologies-hub-ui/react'
import useCountdownTimer from './useCountDownTimer'
import { CircleFlash, TimeDiscountContainer, TimeDiscountTag } from './styles'

interface TimeDiscountProps {
  timeY: boolean
  deadline: string
  size?: 'sm' | 'xs'
  isLineX?: boolean
}

export default function TimeDiscount({
  size,
  deadline,
  timeY,
  isLineX,
}: TimeDiscountProps) {
  const { days, hours, minutes, seconds } = useCountdownTimer(deadline)

  return (
    <TimeDiscountContainer>
      <TimeDiscountTag size={size} isLineX={isLineX}>
        <CircleFlash size={size} title="Desconto relampago">
          <Lightning size={20} />
        </CircleFlash>

        {timeY ? (
          <>
            <Text>{days}d</Text>
            <Text>{hours}h</Text>
            <Text>{minutes}m</Text>
            <Text>{seconds}s</Text>
          </>
        ) : (
          <Text>{`${days}d ${hours}h ${minutes}m ${seconds}s`}</Text>
        )}
      </TimeDiscountTag>
    </TimeDiscountContainer>
  )
}
