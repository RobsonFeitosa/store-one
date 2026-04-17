import React, {
  ButtonHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { FaExclamationTriangle, FaTrash, FaTrashAlt } from 'react-icons/fa'
import { ButtonConfirmContainer, Confirmed } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  idRemoved: string
  removeAction: (itemId: string) => void
  format: {
    style: 'primary' | 'second'
    text?: string
    size?: number
    weight?: 'slim' | 'bold'
  }
  setActive?: React.Dispatch<React.SetStateAction<boolean>>
}

const ButtonConfirm: React.FC<ButtonProps> = ({
  idRemoved,
  children,
  format,
  ...rest
}) => {
  const [confirm, setConfirm] = useState(0)
  const wrapperRef = useRef(null)

  function useOutsideAlerter(reference: any): void {
    useEffect(() => {
      function handleClickOutside(event: any): void {
        if (reference.current && !reference.current.contains(event.target)) {
          setConfirm(0)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [reference])
  }

  useOutsideAlerter(wrapperRef)

  const handleRemove = useCallback(async () => {
    setConfirm(confirm + 1)

    if (confirm) {
      rest.removeAction(idRemoved)
      rest.setActive && rest.setActive(false)
    }
  }, [confirm, rest, idRemoved])

  const { weight, size, style, text } = format

  return (
    <ButtonConfirmContainer
      {...rest}
      type="button"
      ref={wrapperRef}
      onClick={() => handleRemove()}
    >
      {!confirm ? (
        <>
          {weight !== 'slim' ? (
            <FaTrash size={!size ? 16 : size} />
          ) : (
            <FaTrashAlt size={!size ? 16 : size} />
          )}
        </>
      ) : (
        <Confirmed>
          <FaExclamationTriangle
            size={!size ? 16 : size}
            style={{ color: '#f9a712e3' }}
          />
          {style === 'second' && <div className="confirmAct">{text}</div>}
        </Confirmed>
      )}
      {children}
    </ButtonConfirmContainer>
  )
}

export default ButtonConfirm
