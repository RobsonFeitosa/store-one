import { Text } from '@lemonade-technologies-hub-ui/react'
import { WelcomeContainer } from './styles'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IUser, useAuth } from '@/hooks/providers/auth'

export function Welcome() {
  const [userLogged, setUserLogged] = useState<IUser>()
  const { user } = useAuth()

  useEffect(() => {
    setUserLogged(user)
  }, [user])

  return (
    <WelcomeContainer>
      <Text as="span">
        Sejá bem vindo, <Text as="strong">{userLogged?.name}</Text>!
      </Text>
      <Text>
        Aproveite as ofertas e descontos exclusivos disponíveis agora!
        <Link href="/products?onlyDiscount=true">Ver produtos</Link>
      </Text>
    </WelcomeContainer>
  )
}
