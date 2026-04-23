import Image from 'next/image'
import logoImg from '@/assets/logo.svg'
import { Text } from '@lemonade-technologies-hub-ui/react'
import { Container as Grid, Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import Float from './Float'
import { useEffect } from 'react'
import { Gear, Heart, WhatsappLogo } from 'phosphor-react'
import CategoriesMenu from './CategoriesMenu'
import Search from './Search'
import SideWrapperAccount from './components/SideWrapperAccount'
import { useGetAllCategories } from '@/hooks/useGetAllCategories'

import {
  Brand,
  Container,
  HeadGray,
  HeaderContainer,
  LinkWish,
  Menu,
  RowGray,
  RowTwo,
  WrapperWhats,
} from './styles'

export function Header() {
  // const { '@StoreOne:user': userOnCookies } = parseCookies()
  // const [user, setUser] = useState<IUser | null>(null)

  // const userCookies = userOnCookies ? JSON.parse(userOnCookies) : null

  // useEffect(() => {
  //   userCookies && setUser(userCookies)
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // const isMaster = user?.settings.level === 1

  const { data: categoriesData, refetch: getAllCategories } =
    useGetAllCategories({ limit: 99999, page: 1 })

  useEffect(() => {
    getAllCategories()
  }, [getAllCategories])

  const [categoriesRes] = categoriesData ?? []

  return (
    <>
      <RowGray>
        <Grid>
          <Container>
            <Row>
              <Col xs lg="12" sm="12">
                <HeadGray>
                  <Link href={`/admin`}>
                    <Gear size={18} />
                    Administrativo
                  </Link>
                  <LinkWish href="/wishes">
                    <Heart size={18} />
                    Lista de desejos
                  </LinkWish>
                </HeadGray>
              </Col>
            </Row>
          </Container>
        </Grid>
      </RowGray>

      <HeaderContainer>
        <Grid>
          <Container>
            <Row>
              <Col xs lg="2" sm="12">
                <Brand>
                  <Link href="/">
                    <Image
                      src={logoImg}
                      width={122}
                      height={49}
                      quality={100}
                      priority
                      alt=""
                    />
                  </Link>
                </Brand>
              </Col>

              <Col lg="6" sm="12">
                <Menu>
                  <ul>
                    <li>
                      <Link href={'/'}>Início</Link>
                    </li>
                    <li>
                      <Link href={'/products'}>Produtos</Link>
                    </li>
                    <li>
                      <Link href={'/services'}>Serviços</Link>
                    </li>
                    <li>
                      <Link href={`/products?onlyDiscount=true`}>
                        Descontos
                      </Link>
                    </li>
                    <li>
                      <Link href="#footer">Contato</Link>
                    </li>
                  </ul>
                </Menu>
              </Col>
              <Col lg="4" sm="12">
                <SideWrapperAccount />
              </Col>
            </Row>
            <RowTwo>
              <CategoriesMenu
                categoriesRes={categoriesRes ?? []}
                label="Categorias da loja"
              />
              <Search categoriesRes={categoriesRes ?? []} />
              <WrapperWhats>
                <WhatsappLogo size={42} />
                <div>
                  <Text as="span">Suporte rápido</Text>
                  <Text as="span">(99) 9 9999-9999</Text>
                </div>
              </WrapperWhats>
            </RowTwo>
          </Container>

          {/* <Nav /> */}
        </Grid>

        <Float />
      </HeaderContainer>
    </>
  )
}
