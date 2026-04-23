import { useDropzone } from 'react-dropzone'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import { Image as ImagePhosphor, X } from 'phosphor-react'

import {
  BtnRemove,
  ImageContent,
  ImageSingle,
  Input,
  LoadingWrapper,
  UploadImageContainer,
  UploadImageContent,
  UploadImageContentSingle,
} from './styles'

interface UploadImageProps {
  onImageVariation: (images: File[]) => void
  defaultValue?: string[]
  height?: number
  maxFiles?: number
  column?: number
  offClosed?: boolean
}

export default function UploadImage2({
  defaultValue,
  height = 50,
  maxFiles = 1,
  offClosed = false,
  column = 1,
  onImageVariation,
}: UploadImageProps) {
  const [files, setFiles] = useState<string[]>(defaultValue ?? [])
  const onDrop = useCallback(
    (acceptedFiles: any[]) => {
      if (acceptedFiles.length === 0) return

      onImageVariation(acceptedFiles.map((file) => file))
      if (acceptedFiles.length === 1) {
        setFiles([URL.createObjectURL(acceptedFiles[0])])
        return
      }
      for (const file of acceptedFiles) {
        setFiles((state) => [...state, URL.createObjectURL(file)])
      }
      onImageVariation(acceptedFiles.map((file) => file))
    },
    [onImageVariation],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles,
  })

  function handleRemoveImage(image: string) {
    setFiles((state) => [...state.filter((s) => s !== image)])
    onImageVariation([])
  }

  return (
    <UploadImageContainer hasImage={files.length > 0}>
      {files.length === 0 && (
        <LoadingWrapper
          style={{
            height,
            borderWidth: files.length === 0 ? '2px' : 0,
          }}
          {...getRootProps()}
        >
          <ImagePhosphor size="30px" alt="Imagem do produto" />
        </LoadingWrapper>
      )}

      {files.length > 0 && (
        <ImageContent
          style={{
            gridTemplateColumns: `repeat(${column}, 1fr)`,
          }}
        >
          {files.map((fileName) => (
            <ImageSingle key={fileName}>
              {!offClosed && (
                <BtnRemove onClick={() => handleRemoveImage(fileName)}>
                  <X />
                </BtnRemove>
              )}
              <UploadImageContent
                style={{
                  height,
                  borderWidth: files.length === 0 ? '2px' : 0,
                }}
                {...getRootProps()}
              >
                <div>
                  <Input {...getInputProps()} accept="image/png" size="md" />
                  {fileName && (
                    <UploadImageContentSingle>
                      <Image
                        src={fileName}
                        layout="fill"
                        objectFit={'cover'}
                        alt="Imagem do produto"
                      />
                    </UploadImageContentSingle>
                  )}
                </div>
              </UploadImageContent>
            </ImageSingle>
          ))}
        </ImageContent>
      )}
    </UploadImageContainer>
  )
}
