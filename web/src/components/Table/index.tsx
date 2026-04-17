import { Text } from '@lemonade-technologies-hub-ui/react'
import { TableContainer, TableContent, TableHeaders } from './styles'
import { ReactNode } from 'react'

interface TableProps {
  children: ReactNode
  headers: string[]
  columns?: string
}

export default function Table({ children, headers, columns }: TableProps) {
  const adjustColumns = columns ?? `repeat(${headers.length}, 1fr)`

  return (
    <TableContainer>
      <TableHeaders css={{ $$columnNumber: adjustColumns }}>
        {headers.map((header) => (
          <Text as="span" key={header}>
            {header}
          </Text>
        ))}
      </TableHeaders>
      <TableContent css={{ $$columnNumber: adjustColumns }}>
        {children}
      </TableContent>
    </TableContainer>
  )
}
