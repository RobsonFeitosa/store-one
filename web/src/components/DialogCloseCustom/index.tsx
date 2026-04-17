import { X } from 'phosphor-react'
import { DialogCloseCustomContainer } from './styles'

interface DialogCloseCustomProps {
  onClose: () => void
}

export function DialogCloseCustom({ onClose }: DialogCloseCustomProps) {
  return (
    <DialogCloseCustomContainer type="button" onClick={() => onClose()}>
      <X />
    </DialogCloseCustomContainer>
  )
}
