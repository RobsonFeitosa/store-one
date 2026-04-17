import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { MagnifyingGlass } from 'phosphor-react'
import { Select } from '@lemonade-technologies-hub-ui/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ICategoryDTO } from '@/dtos/category.dto'
import { urlBuilder } from '@/utils/urlBuilder'

import {
  AllCategories,
  ButtonSearch,
  Form,
  SearchContainer,
  TextInputCustom,
  WrapperActions,
} from './styles'

const searchForm = z.object({
  search: z.string(),
  categoryId: z.string().optional(),
})

export type SearchFormData = z.infer<typeof searchForm>

interface SearchProps {
  categoriesRes: ICategoryDTO[]
}

export default function Search({ categoriesRes }: SearchProps) {
  const router = useRouter()
  const name = router.query.name ? String(router.query.name) : undefined
  const categoryId = router.query.categoryId
    ? String(router.query.categoryId)
    : undefined

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchForm),
    defaultValues: {
      search: name,
      categoryId,
    },
  })

  async function handleRegister(data: SearchFormData) {
    const url = urlBuilder({
      address: '/products',
      searchParams: {
        ...router.query,
        name: data.search ?? 'null',
        ...(data.categoryId &&
          data.categoryId !== 'null' && {
            categoryId: String(data.categoryId),
          }),
      },
    })
    router.push(url)
  }

  const path = router.asPath

  useEffect(() => {
    if (path === '/products') {
      setValue('search', '')
      setValue('categoryId', 'null')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  // function handleOpenCategories() {
  //   setOpenCategories(!openCategories)
  // }

  // function targetCategory(name: string) {
  //   setCategory(name)
  //   setOpenCategories(false)
  // }

  return (
    <SearchContainer>
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <TextInputCustom
          size="sm"
          placeholder="Pesquisar produto"
          error={errors.search?.message}
          {...register('search')}
        />

        <WrapperActions>
          <AllCategories>
            <Controller
              control={control}
              name="categoryId"
              render={({ field: { onChange, name, value } }) => {
                return (
                  <Select
                    defaultValue={value ?? 'null'}
                    placeholder="Todos as categorias "
                    isClean
                    value={value}
                    name={name}
                    title="Todos as categorias"
                    options={categoriesRes.map((category) => ({
                      label: category.name,
                      value: category.id,
                    }))}
                    onValueChange={(data) => onChange(data)}
                  />
                )
              }}
            />
            {/* <BtnSelectCategory type="button" onClick={handleOpenCategories}>
              {openCategories ? <CaretUp size={12} /> : <CaretDown size={12} />}
            </BtnSelectCategory>

            {openCategories && (
              <CategoriesContent>
                <div>
                  <ArrowUp />
                  <Controller
                    control={control}
                    name="categoryId"
                    render={({
                      field: { onChange, name, value },
                      fieldState: { error },
                    }) => {
                      return (
                        <Select
                          placeholder="Todos os "
                          options={categoriesRes.map((category) => ({
                            label: category.name,
                            value: category.name,
                          }))}
                        />
                        // <ul>
                        //   <li>
                        //     <Text as="span">Todas as categorias</Text>
                        //   </li>
                        //   {categoriesRes?.map((category) => (
                        //     <li key={category.id}>
                        //       <button
                        //         type="button"
                        //         onClick={() => targetCategory(category.name)}
                        //       >
                        //         <Text as="span">{category.name}</Text>
                        //       </button>
                        //     </li>
                        //   ))}
                        // </ul>
                      )
                    }}
                  />
                </div>
              </CategoriesContent> */}
            {/* )} */}
          </AllCategories>

          <ButtonSearch size="sm" type="submit" disabled={isSubmitting}>
            <MagnifyingGlass size={18} />
            Pesquisar
          </ButtonSearch>
        </WrapperActions>
      </Form>
    </SearchContainer>
  )
}
