import { Collapsible } from '@lemonade-technologies-hub-ui/react'
import { VariationCollapseContainer } from './styles'
import { Option } from '@/dtos'
import { ReactNode, useState } from 'react'

interface VariationCollapse {
  option: Option
  children: ReactNode
}

export default function VariationCollapse({
  option,
  children,
}: VariationCollapse) {
  const [openVariationCollapse, setOpenVariationCollapse] = useState(true)

  return (
    <VariationCollapseContainer>
      <Collapsible
        label={option.label}
        initOpen={openVariationCollapse}
        setOpen={() => setOpenVariationCollapse(!openVariationCollapse)}
      >
        {children}
      </Collapsible>
    </VariationCollapseContainer>
  )
}


