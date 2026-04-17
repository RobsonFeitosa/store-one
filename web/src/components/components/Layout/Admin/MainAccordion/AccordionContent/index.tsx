import { ReactNode, forwardRef } from 'react'
import { AccordionContentContainer, AccordionText } from './styles'

interface AccordionContentProps {
  children: ReactNode
}

export const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ children, ...props }, forwardedRef) => (
  <AccordionContentContainer {...props} ref={forwardedRef}>
    <AccordionText>{children}</AccordionText>
  </AccordionContentContainer>
))

AccordionContent.displayName = 'AccordionContent'
