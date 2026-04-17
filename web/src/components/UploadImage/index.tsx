import { useDropzone } from 'react-dropzone'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import { X } from 'phosphor-react'
import { Text } from '@lemonade-technologies-hub-ui/react'
import { Control, useFieldArray } from 'react-hook-form'

import {
  BtnRemove,
  ImageContent,
  ImageSingle,
  UploadContent,
  UploadImageContainer,
  UploadImageContent,
  UploadImageContentSingle,
} from './styles'

interface UploadImageProps {
  control: Control<any>
  onImageVariation: (images: File[]) => void
  offClosed?: boolean
  single?: boolean
}

export default function UploadImage({
  control,
  offClosed = false,
  single = false,
  onImageVariation,
}: UploadImageProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'images',
  })

  const [fileSingle, setFileSingle] = useState<string | null>()

  const onDrop = useCallback(
    (acceptedFiles: any[]) => {
      if (acceptedFiles.length === 0) return

      if (!single) {
        acceptedFiles.forEach((file, index) => {
          append({
            id: index,
            path: URL.createObjectURL(file),
            file,
          })
        })
      } else {
        setFileSingle(URL.createObjectURL(acceptedFiles[0]))
        onImageVariation([acceptedFiles[0]])
      }
    },
    [append, onImageVariation, single],
  )

  const { getRootProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 8,
  })

  const label = single ? 'carregar imagem' : 'carregar imagens'

  return (
    <UploadImageContainer>
      {!single && (
        <UploadContent {...getRootProps()}>
          <Text as="span">{label}</Text>
        </UploadContent>
      )}

      {single ? (
        <div>
          {!fileSingle && (
            <UploadContent {...getRootProps()}>
              <Text as="span">{label}</Text>
            </UploadContent>
          )}

          {fileSingle && (
            <UploadImageContentSingle>
              <BtnRemove onClick={() => remove(0)}>
                <X />
              </BtnRemove>

              <Image
                src={fileSingle}
                layout="fill"
                objectFit={'cover'}
                alt="Imagem do produto"
              />
            </UploadImageContentSingle>
          )}
        </div>
      ) : (
        <>
          {fields.length > 0 && (
            <ImageContent>
              {fields.map((field: any, index) => (
                <ImageSingle key={field.id}>
                  {!offClosed && (
                    <BtnRemove onClick={() => remove(index)}>
                      <X />
                    </BtnRemove>
                  )}
                  <UploadImageContent>
                    <div>
                      <Image
                        src={field.path}
                        layout="fill"
                        objectFit={'cover'}
                        alt="Imagem do produto"
                      />
                    </div>
                  </UploadImageContent>
                </ImageSingle>
              ))}
            </ImageContent>
          )}
        </>
      )}
    </UploadImageContainer>
  )
}
