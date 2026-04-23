import { ImageWrapperBox, ImagesContainer, UploadContent } from './styles'
import { Collapsible } from '@lemonade-technologies-hub-ui/react'
import { useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import UploadImage3 from '@/components/UploadImage3'

interface ImagesProps {
  control: Control<any>
  type?: string | null
}

export default function Images({ control, type }: ImagesProps) {
  const [collapse, setCollapse] = useState(true)

  const label = type === 'product' ? 'produto' : 'serviço'

  return (
    <div>
      <ImagesContainer>
        <Collapsible
          initOpen={collapse}
          setOpen={() => setCollapse(!collapse)}
          label={`Imagens do ${label}`}
        >
          <ImageWrapperBox>
            <UploadContent>
              <UploadImage3
                control={control}
                onImageVariation={() => {}}
              />
            </UploadContent>
          </ImageWrapperBox>
        </Collapsible>
      </ImagesContainer>
    </div>
  )
}


