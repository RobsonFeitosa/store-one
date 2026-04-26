import {
  AccordionItem,
  AccordionRoot,
  ArrowDown,
  FloatSubmenu,
  MainAccordionContainer,
  MenuWrapper,
} from './styles'
import { AccordionTrigger } from './AccordionTrigger'
import { AccordionContent } from './AccordionContent'
import {
  Calendar,
  ClipboardText,
  CreditCard,
  Gauge,
  Gear,
  Package,
  Tag,
  Storefront,
  Users,
} from 'phosphor-react'
import { Text } from '@lemonade-technologies-hub-ui/react'
import { useSettings } from '@/hooks/providers/settings'
import Link from 'next/link'

const SubmenuProducts = (
  <ul>
    <li>
      <Link href="/admin/products/new/1">Adicionar produto</Link>
    </li>
    <li style={{ display: 'none' }}>
      <Link href="/admin/products/categories">Categorias</Link>
    </li>
    <li>
      <Link href="/admin/providers">Fornecedores</Link>
    </li>
  </ul>
)

const SubmenuService = (
  <ul>
    <li>
      <Link href="/admin/services/new/1">Adicionar serviço</Link>
    </li>
    <li>
      <Link href="/admin/teams">Equipes</Link>
    </li>
    <li>
      <Link href="/admin/professionals">Profissionais</Link>
    </li>
    <li style={{ display: 'none' }}>
      <Link href="/admin/services/categories">Categorias</Link>
    </li>
  </ul>
)

const SubmenuUsers = (
  <ul>
    <li>
      <Link href="/admin/users/clients">Clientes</Link>
    </li>
    <li>
      <Link href="/admin/users/shopkeepers">Lojistas</Link>
    </li>
  </ul>
)

// const SubmenuSchedule = (
//   <ul>
//     <li>
//       <Link href="/schedules/services">Serviços</Link>
//     </li>
//     <li style={{ display: 'none' }}>
//       <Link href="/schedules/teams">Equipes</Link>
//     </li>
//   </ul>
// )

interface MainAccordionProps {
  isMinimize: boolean
}

export default function MainAccordion({
  isMinimize = false,
}: MainAccordionProps) {
  const { currentAside } = useSettings()

  return (
    <MainAccordionContainer isMinimize={isMinimize}>
      <AccordionRoot type="single" value={currentAside} collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger
            item="item-1"
            isMinimize={isMinimize}
            isEmpty
            href="/admin"
          >
            <Gauge size={24} />
            <Text as="span">Dashboard</Text>
          </AccordionTrigger>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger
            item="item-2"
            isMinimize={isMinimize}
            isEmpty
            href="/admin/orders"
          >
            <ClipboardText size={24} />
            <Text as="span">Pedidos</Text>
          </AccordionTrigger>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger
            item="item-3"
            isMinimize={isMinimize}
            isEmpty
            href="/admin/schedules"
          >
            <Calendar size={24} />
            <Text as="span">Agenda operacional</Text>
          </AccordionTrigger>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger
            item="item-4"
            isMinimize={isMinimize}
            href="/admin/products"
          >
            <Package size={24} />
            <Text as="span">Produtos</Text>
          </AccordionTrigger>
          <AccordionContent>{SubmenuProducts}</AccordionContent>

          {isMinimize && (
            <MenuWrapper>
              <ArrowDown />
              <FloatSubmenu>{SubmenuProducts}</FloatSubmenu>
            </MenuWrapper>
          )}
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger
            item="item-5"
            isMinimize={isMinimize}
            href="/admin/services"
          >
            <Gear size={24} />
            <Text as="span">Serviços</Text>
          </AccordionTrigger>
          <AccordionContent>{SubmenuService}</AccordionContent>

          {isMinimize && (
            <MenuWrapper>
              <ArrowDown />
              <FloatSubmenu>{SubmenuService}</FloatSubmenu>
            </MenuWrapper>
          )}
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger
            item="item-7"
            isMinimize={isMinimize}
            isEmpty
            href="/admin/time-discounts"
          >
            <Tag size={24} />
            <Text as="span">Descontos temporais</Text>
          </AccordionTrigger>
        </AccordionItem>

        <AccordionItem value="item-8" style={{ display: 'none' }}>
          <AccordionTrigger
            item="item-8"
            isMinimize={isMinimize}
            isEmpty
            href="/admin/transactions"
          >
            <CreditCard size={24} />
            <Text as="span">Transações</Text>
          </AccordionTrigger>
        </AccordionItem>

        <AccordionItem value="item-9">
          <AccordionTrigger
            item="item-9"
            isMinimize={isMinimize}
            isEmpty
            href="/admin/tenants"
          >
            <Storefront size={24} />
            <Text as="span">Lojas</Text>
          </AccordionTrigger>
        </AccordionItem>

        <AccordionItem value="item-10">
          <AccordionTrigger
            item="item-10"
            isMinimize={isMinimize}
            href="/admin/users"
          >
            <Users size={24} />
            <Text as="span">Usuários</Text>
          </AccordionTrigger>
          <AccordionContent>{SubmenuUsers}</AccordionContent>

          {isMinimize && (
            <MenuWrapper>
              <ArrowDown />
              <FloatSubmenu>{SubmenuUsers}</FloatSubmenu>
            </MenuWrapper>
          )}
        </AccordionItem>
      </AccordionRoot>
    </MainAccordionContainer>
  )
}
