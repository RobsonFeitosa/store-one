import {
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from 'react-icons/md'
import { RadioContainer } from './styles'

interface RadioProps {
  selected: boolean
}

export function Radio({ selected }: RadioProps) {
  return (
    <RadioContainer>
      {selected ? (
        <MdOutlineRadioButtonUnchecked />
      ) : (
        <MdOutlineRadioButtonChecked />
      )}
    </RadioContainer>
  )
}
