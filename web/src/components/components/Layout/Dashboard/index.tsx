import { Heading } from '@lemonade-technologies-hub-ui/react'
import { Col, Container, Row } from 'react-bootstrap'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { FaSignOutAlt, FaUserCog } from 'react-icons/fa'
import {
  AsideBar,
  AsideBarContent,
  BannerWrapper,
  BtnSignOut,
  DashboardContainer,
  DashboardContent,
  DashboardWrapper,
  HamburgerButton,
  HeaderWrapper,
  LinkMenu,
  MenuMobileContainer,
} from './styles'
import { ReactNode } from 'react'
import MainLayout from '../Main'
import { useRouter } from 'next/router'
import BannerMyAccount from '@/assets/banner-my-account.png'
import Image from 'next/image'
import { useAuth } from '@/hooks/providers/auth'
import { List, X } from 'phosphor-react'
import { useState } from 'react'

const menus = [
  {
    label: 'Dashboard',
    icon: <BsFillBagCheckFill />,
    path: '/dashboard',
    visibility: true,
  },
  {
    label: 'Pedidos',
    icon: <BsFillBagCheckFill />,
    path: '/dashboard/orders',
    visibility: true,
  },
  {
    label: 'Endereços',
    icon: <FaUserCog />,
    path: '/dashboard/address',
    visibility: true,
  },
  {
    label: 'Cadastro',
    icon: <FaUserCog />,
    path: '/dashboard/register',
    visibility: true,
  },
  {
    label: 'Sair',
    icon: <FaSignOutAlt />,
    path: undefined,
    visibility: true,
  },
]

interface DashboardProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardProps) {
  const { signOut } = useAuth()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const path = router.asPath

  function handleSignOut() {
    signOut()
    router.push('/')
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <MainLayout>
      <DashboardContainer>
        <Container>
          <Row>
            <Col xs="12" sm="12" md="12" lg="12">
              <BannerWrapper>
                <Image
                  src={BannerMyAccount}
                  width={1920}
                  height={196}
                  alt="banner"
                />
              </BannerWrapper>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="12" md="12" lg="3">
              <HeaderWrapper>
                <HamburgerButton onClick={toggleMenu}>
                  {isMenuOpen ? <X size={32} /> : <List size={32} />}
                </HamburgerButton>
                <Heading as="h2">Minha conta</Heading>
              </HeaderWrapper>

              {isMenuOpen && (
                <MenuMobileContainer>
                  {menus.map((menu) => (
                    <div key={menu.label}>
                      {menu.label === 'Sair' ? (
                        <BtnSignOut onClick={handleSignOut}>
                          {menu.label}
                        </BtnSignOut>
                      ) : (
                        <LinkMenu
                          href={menu.path ?? ''}
                          actived={path === menu.path}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {menu.label}
                        </LinkMenu>
                      )}
                    </div>
                  ))}
                </MenuMobileContainer>
              )}
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="12" md="12" lg="2">
              <AsideBar>
                <AsideBarContent>
                  {menus.map((menu) => (
                    <div key={menu.label}>
                      {menu.label === 'Sair' ? (
                        <BtnSignOut onClick={handleSignOut}>
                          {menu.label}
                        </BtnSignOut>
                      ) : (
                        <LinkMenu
                          href={menu.path ?? ''}
                          actived={path === menu.path}
                        >
                          {menu.label}
                        </LinkMenu>
                      )}
                    </div>
                  ))}
                </AsideBarContent>
              </AsideBar>
            </Col>
            <Col xs="12" sm="12" md="12" lg="10">
              <DashboardContent>
                <DashboardWrapper>{children}</DashboardWrapper>
              </DashboardContent>
            </Col>
          </Row>
        </Container>
      </DashboardContainer>
    </MainLayout>
  )
}
