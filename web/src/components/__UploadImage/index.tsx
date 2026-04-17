import { useDropzone } from 'react-dropzone'

import {
  BtnRemove,
  ImageContent,
  ImageSingle,
  Input,
  UploadImageContainer,
  UploadImageContent,
  UploadImageContentSingle,
} from './styles'
import { useCallback, useState } from 'react'
import Image from 'next/image'
import { Image as ImagePhosphor, X } from 'phosphor-react'
import { Text } from '@lemonade-technologies-hub-ui/react'

interface UploadImageProps {
  onImageVariation: (images: File[]) => void
  defaultValue?: string[]
  height?: number
  maxFiles?: number
  column?: number
  offClosed?: boolean
  limitTextFile?: number
}

export default function UploadImage({
  defaultValue,
  height = 50,
  maxFiles = 1,
  offClosed = false,
  column = 1,
  limitTextFile,
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

  const { getRootProps, fileRejections, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png'],
    },
    maxFiles,
  })

  function handleRemoveImage(image: string) {
    setFiles((state) => [...state.filter((s) => s !== image)])
  }

  // useEffect(() => {
  //   defaultValue && setFiles(defaultValue)
  // }, [defaultValue])

  return (
    <UploadImageContainer
      style={{
        height,
        borderWidth: files.length === 0 ? '2px' : 0,
      }}
      {...getRootProps()}
    >
      {files.length > 0 ? (
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
              <UploadImageContent>
                <div>
                  <Input {...getInputProps()} accept="image/png" size="md" />
                  {fileName && (
                    <UploadImageContentSingle>
                      <Image src={fileName} fill alt="Imagem do produto" />
                    </UploadImageContentSingle>
                  )}
                </div>
              </UploadImageContent>
            </ImageSingle>
          ))}
        </ImageContent>
      ) : (
        <>
          {fileRejections.length > 0 ? (
            <div>
              {limitTextFile === maxFiles && (
                <Text size="xs">
                  Numero máximo de imagem atingido ({maxFiles})
                </Text>
              )}
            </div>
          ) : (
            <>
              <ImagePhosphor size="30px" alt="Imagem do produto" />
              {Boolean(limitTextFile) && (
                <Text size="xs">até {limitTextFile}</Text>
              )}
            </>
          )}
        </>
      )}
    </UploadImageContainer>
  )
}
