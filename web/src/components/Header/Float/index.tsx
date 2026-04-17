import React, { useEffect, useState } from 'react'
import logoImg from '@/assets/logo.svg'
import { Container as Grid, Row } from 'react-bootstrap'
import Image from 'next/image'
import { CategoriesWrapper, Container, LinkBrand, RowFloat } from './styles'
import SideWrapperAccount from '../components/SideWrapperAccount'
import Search from '../Search'
import CategoriesMenu from '../CategoriesMenu'
import { useGetAllCategories } from '@/hooks/useGetAllCategories'

export default function Float() {
  const [isFloat, setIsFloat] = useState(false)

  const { data: categoriesData } = useGetAllCategories({
    limit: 99999,
    page: 1,
  })

  const [categoriesRes] = categoriesData ?? []
  useEffect(() => {
    if (window.innerWidth > 768) {
      window.addEventListener('scroll', () => {
        const x = window.scrollY

        if (x && x > 180) {
          setIsFloat(true)
        } else {
          setIsFloat(false)
        }

        return false
      })
    }
  }, [])

  // useEffect(() => {
  //   user &&
  //     crop(user.settings.avatar_url, 1 / 1).then((canvas: any) => {
  //       const imgCrop = document.querySelector('.imgCropFloat')
  //       imgCrop?.querySelector('canvas')?.remove()
  //       imgCrop?.appendChild(canvas)
  //     })
  // }, [user])

  return (
    <Container float={isFloat}>
      <Grid>
        <Row>
          <RowFloat>
            <LinkBrand href="/">
              <Image
                src={logoImg}
                width={122}
                height={49}
                quality={100}
                priority
                alt=""
              />
            </LinkBrand>

            <CategoriesWrapper>
              <CategoriesMenu categoriesRes={categoriesRes ?? []} />
            </CategoriesWrapper>

            <Search categoriesRes={categoriesRes ?? []} />
            <SideWrapperAccount />
          </RowFloat>
        </Row>
      </Grid>
    </Container>
  )
}
