import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Armchair,
  CaretDown,
  DeviceMobileCamera,
  HouseLine,
  List,
  Tag,
  UserGear,
} from 'phosphor-react'
import temp1 from '@/assets/temp1.png'
import { Text } from '@lemonade-technologies-hub-ui/react'
import Image from 'next/image'
import { ICategoryDTO } from '@/dtos/category.dto'
import { useRouter } from 'next/router'

import {
  ArrowUp,
  BtnGoToNav,
  BtnMenu,
  CategoriesMenuContainer,
  ListWrapper,
  MenuItem,
  WrapperUl,
} from './styles'

interface CategoriesMenuProps {
  label?: string
  categoriesRes: ICategoryDTO[]
}

export default function CategoriesMenu({
  label,
  categoriesRes,
}: CategoriesMenuProps) {
  const [openMenu, setOpenMenu] = useState(false)
  const [categories, setCategories] = useState<ICategoryDTO[]>([])

  function handleMenuCategories() {
    setOpenMenu(!openMenu)
  }

  useEffect(() => {
    if (categoriesRes) {
      categoriesRes
        ?.filter((c) => c.parent_id)
        .forEach((c) => {
          const parent = categoriesRes.find((p) => p.id === c.parent_id)

          if (parent) {
            parent.subCategories = parent.subCategories ?? []

            if (!parent.subCategories.map((s) => s.id).includes(c.id)) {
              parent.subCategories.push(c)
            }
          }
        })

      const newCategories = categoriesRes?.filter((c) => !c.parent_id)

      setCategories(newCategories)
    }
  }, [categoriesRes])

  const wrapperRef = useRef(null)

  function useOutsideAlerter(reference: any): void {
    useEffect(() => {
      function handleClickOutside(event: any): void {
        if (reference.current && !reference.current.contains(event.target)) {
          setOpenMenu(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [reference])
  }

  useOutsideAlerter(wrapperRef)

  const renderCategory = useCallback(
    (categories: ICategoryDTO[], type: string) => {
      return categories?.map(
        (category) =>
          category.type === type && (
            <li key={category.id}>
              <div>
                <BtnGoToNav
                  onClick={() => goToNav(`/${type}s?categoryId=${category.id}`)}
                >
                  {category.name}
                  {category.subCategories && <CaretDown size={12} />}
                </BtnGoToNav>
              </div>

              {category.subCategories && (
                <WrapperUl>
                  <ul>{renderCategory(category.subCategories, type)}</ul>
                </WrapperUl>
              )}
            </li>
          ),
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const router = useRouter()

  function goToNav(href: string) {
    router.push(href)
    setOpenMenu(false)
  }

  return (
    <CategoriesMenuContainer ref={wrapperRef}>
      <BtnMenu onClick={handleMenuCategories} hasLabel={!label}>
        <Text as="span"> {label}</Text>
        <List size={26} />
      </BtnMenu>

      {openMenu && (
        <ListWrapper>
          <div>
            <ArrowUp isLabel={!label} />
            <ul>
              <li>
                <MenuItem>
                  <BtnGoToNav onClick={() => goToNav('/')}>
                    <HouseLine size={20} />
                    <Text>Todos</Text>
                  </BtnGoToNav>
                </MenuItem>
              </li>
              <li>
                <MenuItem>
                  <BtnGoToNav onClick={() => goToNav('/products')}>
                    <Armchair size={20} />
                    <Text>Produtos</Text>
                  </BtnGoToNav>
                  <CaretDown size={12} />
                </MenuItem>

                <WrapperUl>
                  <ul>{categories && renderCategory(categories, 'product')}</ul>
                </WrapperUl>
              </li>
              <li>
                <MenuItem>
                  <BtnGoToNav onClick={() => goToNav('/services')}>
                    <UserGear size={20} />
                    <Text>Serviços</Text>
                  </BtnGoToNav>
                  <CaretDown size={12} />
                </MenuItem>

                <WrapperUl>
                  <ul>{categories && renderCategory(categories, 'service')}</ul>
                </WrapperUl>
              </li>
              <li>
                <MenuItem>
                  <BtnGoToNav
                    onClick={() => goToNav('/products?onlyDiscount=true')}
                  >
                    <Tag size={20} />
                    <Text>Descontos</Text>
                  </BtnGoToNav>
                </MenuItem>
              </li>
              <li>
                <MenuItem>
                  <BtnGoToNav onClick={() => goToNav('#footer')}>
                    <DeviceMobileCamera size={20} />
                    <Text>Contate-nos</Text>
                  </BtnGoToNav>
                </MenuItem>
              </li>
              <li>
                <Image src={temp1} width={175} height={137} alt="" />
              </li>
            </ul>
          </div>
        </ListWrapper>
      )}
    </CategoriesMenuContainer>
  )
}
