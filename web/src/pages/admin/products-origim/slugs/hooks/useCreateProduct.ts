import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'
import { ToastMessage, useToast } from '@/hooks/providers/toast'
import { useRouter } from 'next/router'
import { IProductDTO } from '@/pages/admin/dtos/product.dto'
import { CreateArchiveProps, useCreateArchive } from '@/hooks/useCreateArchive'
import { IVariationDTO } from '@/pages/admin/dtos/variation.dto'
import { IAttributeDTO } from '@/pages/admin/dtos/attribute.dto'
import { ProductFormData } from '../types'

interface CreateAttributeProps {
  payload: ProductFormData
  addToast: (message: Omit<ToastMessage, 'id'>) => void
  onRouter: (data: IProductDTO) => void
  savedImageArchive: (image: CreateArchiveProps) => void
}

const createProduct = async ({
  payload,
  addToast,
  onRouter,
  savedImageArchive,
}: CreateAttributeProps) => {
  try {
    const { images, ...rest } = payload
    const response: any = await api.post<any>(
      urlBuilder({
        address: URLs.PRODUCTS,
      }),
      rest,
    )


    console.log({ response, payload })
    if (response.data.statusCode === 201) {
      onRouter(response.data.result)

      const imagesFile = images?.map((i: any) => i.file).filter(Boolean) as File[]

      if (imagesFile && imagesFile.length > 0) {
        savedImageArchive({
          images: imagesFile,
          nameOrigin: 'product',
          referenceId: response.data.result.id,
        })
      }

      addToast({
        type: 'success',
        title: 'Produto criado',
      })

      if (response.data.result.attributes) {
        response.data.result.attributes.forEach(
          (attribute: IAttributeDTO, idx: number) => {
            attribute.variations.forEach(
              (variation: IVariationDTO, index: number) => {
                savedImageArchive({
                  images:
                    payload.attributes && variation.image
                      ? ([
                        payload.attributes[idx].variations[index].image,
                      ] as File[])
                      : [],
                  nameOrigin: 'variation',
                  referenceId: variation.id ?? '',
                })
              },
            )
          },
        )
      }
    }

    // salvar imagems images

    return response
  } catch (error: any) {
    if (error.response?.data.message === 'Product item already used.') {
      addToast({
        type: 'info',
        title: 'Produto já existe',
        description: 'Já existe um produto com o mesmo nome',
      })
    }
    if (
      error.response?.data.message ===
      'the value must be less than the discount price'
    ) {
      addToast({
        type: 'info',
        title: 'Preço incorreto',
        description: 'O valor deve ser menor que o preço com desconto',
      })
    }
    console.error(error)
  }
}

export const useCreateProduct = () => {
  const { addToast } = useToast()

  const { mutateAsync: createArchiveAsync } = useCreateArchive()
  const router = useRouter()

  const label = router.locale?.includes('products') ? 'products' : 'services'

  async function onRouter(data: IProductDTO) {
    await router.push(`/${label}/${data.slug}/${data.id}`)
  }

  function savedImageArchive(data: CreateArchiveProps) {
    createArchiveAsync(data)
  }

  return useMutation({
    mutationFn: (payload: ProductFormData) =>
      createProduct({ payload, addToast, onRouter, savedImageArchive }),
  })
}

