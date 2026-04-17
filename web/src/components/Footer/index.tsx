import { Heading, Text } from '@lemonade-technologies-hub-ui/react'
import logoImg from '@/assets/logo.svg'

import {
  About,
  Brand,
  ContatInfor,
  FacebookLink,
  FooterContainer,
  FooterContent,
  InforMores,
  InstagramLink,
  RowCredits,
  SocialMedia,
  YoutubeLink,
} from './styles'
import {
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  Phone,
  YoutubeLogo,
} from 'phosphor-react'
import Image from 'next/image'
import Link from 'next/link'
import { Container, Row } from 'react-bootstrap'
import Newsletter from '@/components/Footer/Newsletter'
import CallSingle from '@/components/Footer/CallSingle'

export function Footer() {
  return (
    <FooterContainer>
      <Newsletter />

      <Container>
        <Row>
          <CallSingle />

          <FooterContent>
            <About>
              <Brand>
                <Link href="/">
                  <Image
                    src={logoImg}
                    width={196}
                    height={78}
                    quality={100}
                    priority
                    alt=""
                  />
                </Link>
              </Brand>
              <Text>
                Empresa especializada em vendas e prestações de serviços por
                toda região.
              </Text>
              <SocialMedia>
                <InstagramLink href="/">
                  <InstagramLogo size={35} />
                </InstagramLink>
                <FacebookLink href="/">
                  <FacebookLogo size={35} />
                </FacebookLink>
                <YoutubeLink href="/">
                  <YoutubeLogo size={35} />
                </YoutubeLink>
              </SocialMedia>
            </About>
            <InforMores>
              <Heading as="h3">Produtos e serviços</Heading>
              <ul>
                <li>
                  <Link href="/">Produtos</Link>
                </li>
                <li>
                  <Link href="/">Best-seller</Link>
                </li>
                <li>
                  <Link href="/">Produtos em destaque</Link>
                </li>
                <li>
                  <Link href="/">Novos Produtos</Link>
                </li>
                <li>
                  <Link href="/">Produtos em promoção</Link>
                </li>
              </ul>
            </InforMores>

            <InforMores>
              <Heading as="h3">Minha conta</Heading>
              <ul>
                <li>
                  <Link href="/">Pedidos</Link>
                </li>
                <li>
                  <Link href="/whises">Lista de Desejos</Link>
                </li>
                <li>
                  <Link href="/whises">Entrega</Link>
                </li>
                <li>
                  <Link href="/whises">Politica e reembolso</Link>
                </li>
              </ul>
            </InforMores>

            <InforMores>
              <Heading as="h3">Informações da loja</Heading>
              <ContatInfor>
                <div>
                  <div>
                    <MapPin size={22} />
                  </div>
                  <Text> Rua são francisco, 594, lt 44, Av. Manoel Gomes</Text>
                </div>
                <div>
                  <div>
                    <Phone size={22} />
                  </div>
                  <Text>
                    (99) 9 9999 - 9999 (whatsapp) <br /> (99) 9 9999 - 9999{' '}
                    <br />
                    (99) 9 9999 - 9999
                  </Text>
                </div>

                <div>
                  <div>
                    <EnvelopeSimple size={22} />
                  </div>
                  <Text>vendas@empresa.com</Text>
                </div>
              </ContatInfor>
            </InforMores>
          </FooterContent>
        </Row>
      </Container>

      <RowCredits>
        <Text>
          © 2021 - Todos os direitos reservados -
          <a href={process.env.NEXT_PUBLIC_URL}> robsonfeitosa.dev.br</a>
        </Text>
        <a
          href="https://www.linkedin.com/in/robson-feitosa-pimentel-41a55b125/"
          target="_blank"
          rel="noreferrer"
        >
          <Text as="small">
            project by <LinkedinLogo size={20} />
          </Text>
        </a>
      </RowCredits>
    </FooterContainer>
  )
}
