import { ReactNode, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import logoImg from '@/assets/logo.svg'
import Link from 'next/link'
import { Plus, SignOut } from 'phosphor-react'
import { Avatar, Text } from '@lemonade-technologies-hub-ui/react'
import MainAccordion from './MainAccordion'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/providers/auth'
import { useSettings } from '@/hooks/providers/settings'

import {
  AccountWrapper,
  AdminAside,
  AdminContainer,
  AdminContent,
  AdminHeader,
  AdminWrapper,
  BrandAdminHeader,
  BtnMinimize,
  BtnSignOut,
  HeaderRight,
  MinimizeBox,
  NewProductLink,
  StyledCaretDoubleLeft,
} from './styles'

interface AdminProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminProps) {
  const { setMinimizeAside, isMinimizeAside, setTopContent } = useSettings()
  const { signOut, user } = useAuth()

  function handleMinimize() {
    setMinimizeAside()
  }

  const adminContent = useRef(null)
  const content = adminContent.current

  useEffect(() => {
    if ((content as any)?.scrollTop === 0) {
      setTopContent(true)
    }

    ;(content as any)?.addEventListener('scroll', () => {
      const x = (content as any)?.scrollTop
      setTopContent(x === 0)
    })
  }, [content, setTopContent])

  const router = useRouter()

  const hasType = router.pathname?.includes('services') ? 'service' : 'product'

  const label = hasType === 'product' ? 'produto' : 'serviço'

  function handleSignOut() {
    signOut()
    router.push('/signin')
  }

  const [userName, setUserName] = useState<string>('')

  useEffect(() => {
    if (user) {
      setUserName(user.name)
    }
  }, [user])

  return (
    <AdminContainer>
      <AdminHeader>
        <BrandAdminHeader>
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
        </BrandAdminHeader>

        <HeaderRight>
          <a href={`${process.env.NEXT_PUBLIC_URL_STORE}`}>Acessar site</a>

          <NewProductLink href={`/${hasType}s/new/1`}>
            <Plus size={16} />
            <Text size="sm">Novo {label}</Text>
          </NewProductLink>
        </HeaderRight>
      </AdminHeader>

      <AdminWrapper>
        <AdminAside isMinimize={isMinimizeAside}>
          <MainAccordion isMinimize={isMinimizeAside} />
          <div>
            <BtnSignOut onClick={handleSignOut} title="sair">
              <SignOut size={18} />
              {!isMinimizeAside && 'sair'}
            </BtnSignOut>
            <MinimizeBox>
              <AccountWrapper>
                <Avatar
                  src="http://localhost:3334/files/example-pd4-1.jpg"
                  alt="Colm Tuite"
                  size="sm"
                />

                <Text>{userName}</Text>
              </AccountWrapper>
              <BtnMinimize onClick={handleMinimize} title="minimizar/maximizar">
                <StyledCaretDoubleLeft size={22} isMinimize={isMinimizeAside} />
              </BtnMinimize>
            </MinimizeBox>
          </div>
        </AdminAside>

        <AdminContent ref={adminContent} id="container33">
          {children}
        </AdminContent>
      </AdminWrapper>
    </AdminContainer>
  )
}
