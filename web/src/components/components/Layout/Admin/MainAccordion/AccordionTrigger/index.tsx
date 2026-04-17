import { ReactNode, forwardRef } from 'react'
import { useRouter } from 'next/router'
import { useSettings } from '@/hooks/providers/settings'

import {
  AccordionTriggerContainer,
  BtnLink,
  StyledChevron,
  Trigger,
} from './styles'

interface AccordionTriggerProps {
  children: ReactNode
  isEmpty?: boolean
  isMinimize?: boolean
  href?: string
  item: string
}

export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(
  (
    { children, isEmpty = false, isMinimize = false, ...props },
    forwardedRef,
  ) => {
    const router = useRouter()
    const { currentAside, setCurrentAside } = useSettings()

    function onLink() {
      props.href && router.push(props.href)
    }

    function handleItem() {
      setCurrentAside(currentAside !== props.item ? props.item : '')
    }

    return (
      <AccordionTriggerContainer isMinimize={isMinimize}>
        <BtnLink onClick={onLink}>
          <div>{children}</div>
        </BtnLink>

        {!isMinimize && (
          <Trigger {...props} ref={forwardedRef} onClick={() => handleItem()}>
            {!isEmpty && <StyledChevron aria-hidden />}
          </Trigger>
        )}
      </AccordionTriggerContainer>
    )
  },
)

AccordionTrigger.displayName = 'AccordionTrigger'
