import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Text } from '@lemonade-technologies-hub-ui/react'
import { MagnifyingGlass } from 'phosphor-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { TypeProduct } from '@/pages/dtos/product.dto'

import {
  BtnSearch,
  Form,
  SearchProductsContainer,
  TextInputCustom,
} from './styles'

const filterForm = z.object({
  name: z.string(),
})

export type FilterFormData = z.infer<typeof filterForm>

interface SearchProductsProps {
  type: TypeProduct
}

export default function SearchProducts({ type }: SearchProductsProps) {
  const router = useRouter()

  const name = router.query.name ? String(router.query.name) : undefined

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FilterFormData>({
    resolver: zodResolver(filterForm),
    defaultValues: {
      name,
    },
  })

  async function handleRegister(data: FilterFormData) {
    const label = type === 'product' ? 'products' : 'services'

    if (data.name) {
      router.push(`/${label}?name=${data.name}`)
    } else {
      router.push(`/${label}`)
    }
  }

  useEffect(() => {
    if (!name) {
      reset({ name: '' }, { keepValues: false })
    }
  }, [name, reset])

  return (
    <SearchProductsContainer>
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <TextInputCustom
          size="sm"
          placeholder="Pesquisar produto"
          error={errors.name?.message}
          {...register('name')}
        />
        <BtnSearch type="submit" disabled={isSubmitting}>
          <MagnifyingGlass size={22} />
          <Text as="span" size="sm">
            Buscar
          </Text>
        </BtnSearch>
      </Form>
    </SearchProductsContainer>
  )
}
