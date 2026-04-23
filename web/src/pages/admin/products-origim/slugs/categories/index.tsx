import {
  Checkbox,
  Collapsible,
  Text,
} from '@lemonade-technologies-hub-ui/react'
import {
  BtnAddCategory,
  CategoriesContainer,
  Category,
  LabelCategory,
  WrapperActions,
  WrapperBtns,
} from './styles'
import { ICategoryDTO } from '@/pages/admin/dtos/category.dto'
import { useCallback, useEffect, useState } from 'react'
import FormCategories from './FormCategories'
import { useGetAllCategories } from '@/pages/admin/hooks/useGetAllCategories'
import { useAuth } from '@/hooks/providers/auth'
import { Control, Controller } from 'react-hook-form'
import { LiaPlusSquare, LiaMinusSquare } from 'react-icons/lia'

export interface IndexCategory {
  id: string
  index: number
}

interface CategoriesProps {
  control: Control<any>
  type?: string | null
}

export default function Categories({ control, type }: CategoriesProps) {
  const { user } = useAuth()
  const [openCollapse, setOpenCollapse] = useState(true)
  const [addNewCategory, setAddNewCategory] = useState(false)
  const [categories, setCategories] = useState<ICategoryDTO[]>([])

  const { data: categoriesData, refetch: getAllCategories } =
    useGetAllCategories({ limit: 99999, page: 1 }, type)

  useEffect(() => {
    user && getAllCategories()
  }, [type, user, getAllCategories])

  function onRefetchCategories() {
    getAllCategories()
  }

  function handleAddNewCategory() {
    setAddNewCategory(!addNewCategory)
  }

  const [categoriesRes, total] = categoriesData ?? []

  useEffect(() => {
    if (categoriesRes) {
      categoriesRes
        ?.filter((c) => c.parent_id)
        .forEach((c) => {
          const parent = categoriesRes.find((p) => p.id === c.parent_id)

          if (parent) {
            parent.subCategories = parent.subCategories ?? []
            parent.subCategories.push(c)
          }
        })
      const newCategories = categoriesRes?.filter((c) => !c.parent_id)

      setCategories(newCategories)
    }
  }, [categoriesRes])

  const getIndex = useCallback(
    (categoryId: string) => {
      return categoriesRes?.findIndex((c) => c.id === categoryId) ?? 0
    },
    [categoriesRes],
  )

  const label = type === 'product' ? 'produto' : 'serviço'

  const renderCategory = useCallback(
    (categories: ICategoryDTO[]) => {
      return categories?.map((category) => (
        <Category key={category.id}>
          <div style={{ marginLeft: `${category.level}0px` }}>
            <Controller
              control={control}
              name={`categories.${getIndex(category.id)}`}
              render={({ field: { onChange, value } }) => {
                return (
                  <LabelCategory>
                    <Checkbox
                      onCheckedChange={(checked) =>
                        onChange(checked ? category.id : '')
                      }
                      checked={!!value}
                    />
                    <Text>{category.name}</Text>
                  </LabelCategory>
                )
              }}
            />

            {category.subCategories && renderCategory(category.subCategories)}
          </div>
        </Category>
      ))
    },
    [control, getIndex],
  )

  const [categoriesOrigin] = categoriesData ?? []

  return (
    <Collapsible
      initOpen={openCollapse}
      setOpen={() => setOpenCollapse(!openCollapse)}
      label={`Categorias do ${label}`}
    >
      <CategoriesContainer>
        <WrapperActions>
          <WrapperBtns>
            <BtnAddCategory
              type="button"
              onClick={handleAddNewCategory}
              size={'xs'}
            >
              {addNewCategory ? (
                <LiaMinusSquare size={15} />
              ) : (
                <LiaPlusSquare size={15} />
              )}
              Adicionar nova categoria
            </BtnAddCategory>
            <Text size={'xs'}>total {total}</Text>
          </WrapperBtns>

          {addNewCategory && (
            <FormCategories
              categories={categoriesOrigin ?? []}
              onRefetch={onRefetchCategories}
              type={type ?? ''}
            />
          )}
        </WrapperActions>
        <div>{categories && renderCategory(categories)}</div>
      </CategoriesContainer>
    </Collapsible>
  )
}


