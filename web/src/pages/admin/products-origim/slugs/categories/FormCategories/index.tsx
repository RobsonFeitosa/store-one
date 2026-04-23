/* eslint-disable react-hooks/exhaustive-deps */
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import {
  Button,
  SelectAdvanced,
  TextInput,
} from '@lemonade-technologies-hub-ui/react'

import { Form, FormCategoriesContainer } from './styles'
import { useCreateCategory } from '@/pages/admin/hooks/useCreateCategory'
import { useEffect, useMemo } from 'react'
import { ICategoryDTO } from '@/pages/admin/dtos/category.dto'

const categoriesForm = z.object({
  name: z.string(),
  parent_id: z.string().optional(),
})

export type CategoriesFormData = z.infer<typeof categoriesForm>

interface FormCategoriesProps {
  categories: ICategoryDTO[]
  type: string
  onRefetch: () => void
}

export default function FormCategories({
  categories,
  type,
  onRefetch,
}: FormCategoriesProps) {
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CategoriesFormData>({
    resolver: zodResolver(categoriesForm),
  })

  const { isSuccess: isSuccessCategory, mutateAsync: createCategoryAsync } =
    useCreateCategory()

  async function handleRegister(data: CategoriesFormData) {
    await createCategoryAsync({
      name: data.name,
      parent_id: data.parent_id,
      type,
    })
  }

  useEffect(() => {
    if (isSuccessCategory) {
      onRefetch()
      reset()
    }
  }, [isSuccessCategory])

  const optionsParentCategories = useMemo(() => {
    return categories.map((category, index) => {
      return index === 0
        ? {
            label: undefined,
            value: null,
          }
        : {
            label: category.name,
            value: category.id,
          }
    })
  }, [categories])

  return (
    <FormCategoriesContainer>
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <TextInput
          size="sm"
          placeholder="nome da categoria"
          error={errors.name?.message}
          {...register('name')}
        />

        <Controller
          control={control}
          name="parent_id"
          render={({ field: { onChange, name }, fieldState: { error } }) => {
            return (
              <SelectAdvanced
                options={optionsParentCategories}
                error={error?.message as string}
                placeholder="Selecione um parente"
                onChange={(data: any) =>
                  onChange(data ? data.value : undefined)
                }
                size={'sm'}
                name={name}
                isClearable
              />
            )
          }}
        />

        <Button size="sm" type="submit" disabled={isSubmitting}>
          Adicionar
        </Button>
      </Form>
    </FormCategoriesContainer>
  )
}


