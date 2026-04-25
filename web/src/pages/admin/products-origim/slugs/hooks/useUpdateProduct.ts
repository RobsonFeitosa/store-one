import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'
import { ToastMessage, useToast } from '@/hooks/providers/toast'
import { IProductDTO } from '@/pages/admin/dtos/product.dto'
import { useRouter } from 'next/router'
import { IAttributeDTO } from '@/pages/admin/dtos/attribute.dto'
import { IArchiveDTO } from '@/pages/admin/dtos/archive.dto'
import { useDeleteArchive } from '@/pages/admin/hooks/useDeleteArchive'
import { CreateArchiveProps, useCreateArchive } from '@/hooks/useCreateArchive'
import { ProductFormData } from '../types'

interface UpdateAttributeProps {
  payload: ProductFormData
  productId: string
  addToast: (message: Omit<ToastMessage, 'id'>) => void
  onRouter: (data: IProductDTO) => void
  savedCreateImageArchive: (image: CreateArchiveProps) => void
  deleteArchive: (id: string) => void
}

const updateProduct = async ({
  payload,
  productId,
  addToast,
  onRouter,
  savedCreateImageArchive,
  deleteArchive,
}: UpdateAttributeProps) => {
  try {
    const { images, ...rest } = payload

    const response = await api.put(
      urlBuilder({
        address: [URLs.PRODUCTS, productId].join('/'),
      }),
      rest,
    )

    if (response.status === 200) {
      onRouter(response.data)

      const imagesPaths = images?.map((image) => image.path)

      if (images) {
        for (const image of images) {
          if (image.file) {
            savedCreateImageArchive({
              images: [image.file],
              nameOrigin: 'product',
              referenceId: response.data.id,
            })
          }
        }
      }

      response.data.images?.forEach((image: any, index: number) => {
        if (!imagesPaths?.includes(image.picture_url)) {
          if (response.data.images[index].id) {
            deleteArchive(response.data.images[index].id)
          }
        }
      })

      addToast({
        type: 'success',
        title: 'Produto atualizado',
      })

      if (response.data.attributes) {
        response.data.attributes.forEach(
          (attribute: IAttributeDTO, index: number) => {
            attribute.variations.forEach((variation) => {
              if (rest.attributes) {
                const checkVariation = rest.attributes[index].variations.find(
                  (v) => v.name === variation.name,
                )

                if (checkVariation) {
                  if (checkVariation.image instanceof File) {
                    savedCreateImageArchive({
                      images: [checkVariation.image],
                      nameOrigin: 'variation',
                      referenceId: variation.id ?? '',
                    })
                  }
                }

                if (variation) {
                  const checkNullVariation = rest.attributes[
                    index
                  ].variations.find((v) => v.image === null)

                  if (checkNullVariation) {
                    if (variation.name === checkNullVariation.name) {
                      checkNullVariation.id &&
                        deleteArchive((variation.image as IArchiveDTO).id ?? '')
                    }
                  }
                }
              }
            })
          },
        )
      }
    }

    return response
  } catch (error: any) {
    if (error.response?.status === 500) {
      addToast({
        type: 'error',
        title: 'Error interno',
      })
    }

    console.error(error)
  }
}

export const useUpdateProduct = (productId: string) => {
  const router = useRouter()
  const { addToast } = useToast()

  const { mutateAsync: createArchiveAsync } = useCreateArchive()

  const { mutateAsync: deleteArchiveAsync } = useDeleteArchive()

  async function onRouter(data: IProductDTO) {
    const isService = data.type === 'service'
    const basePath = isService ? '/admin/services' : '/admin/products-origim'
    await router.push(`${basePath}/${data.slug}/${data.id}`)
  }

  function savedCreateImageArchive(data: CreateArchiveProps) {
    createArchiveAsync(data)
  }

  function deleteArchive(id: string) {
    deleteArchiveAsync(id)
  }

  return useMutation({
    mutationFn: (payload: ProductFormData) =>
      updateProduct({
        payload,
        addToast,
        productId,
        onRouter,
        savedCreateImageArchive,
        deleteArchive,
      }),
  })
}

