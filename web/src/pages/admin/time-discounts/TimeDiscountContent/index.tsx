import { ITimeDiscountDTO } from '@/pages/admin/dtos/timeDiscount.dto'
import { TimeDiscountContentContainer } from '../styles'
import {
  ProductSingle,
  ProductsWrapper,
  TimeDiscountHeader,
  TimeDiscountWrapper,
  WrapperDates,
} from './styles'
import Link from 'next/link'
import { Text } from '@lemonade-technologies-hub-ui/react'
import formatDate from '@/utils/formatDate'
import { Col, Row } from 'react-bootstrap'
import Status from './Status'

interface TimeDiscountContentProps {
  timeDiscounts: ITimeDiscountDTO[]
}

export default function TimeDiscountContent({
  timeDiscounts,
}: TimeDiscountContentProps) {
  return (
    <TimeDiscountContentContainer>
      <Row>
        {timeDiscounts.map((timeDiscount) => (
          <Col key={timeDiscount.id} sm={4} md={4} lg={4}>
            <TimeDiscountWrapper>
              <TimeDiscountHeader>
                <Link href={`/products/time-discounts/${timeDiscount.id}`}>
                  <Text as="strong">{timeDiscount.id.slice(0, 11)}</Text>
                </Link>
                <div>
                  <Status status={timeDiscount.status} />
                  <Text>{timeDiscount.discount}% desc</Text>
                </div>
              </TimeDiscountHeader>
              <ProductsWrapper isMulti={timeDiscount.products.length > 2}>
                <ul>
                  {timeDiscount.products?.map((product) => (
                    <ProductSingle key={product.id}>
                      <Link
                        href={`/${product.type}s/${product.slug}/${product.id}`}
                      >
                        <Text>{product.name}</Text>
                      </Link>
                    </ProductSingle>
                  ))}
                </ul>
              </ProductsWrapper>
              <WrapperDates>
                <Text>
                  Início:{' '}
                  {formatDate({
                    date: timeDiscount.startDate,
                    hoursView: true,
                  })}
                  h
                </Text>
                <Text>
                  Fim:{' '}
                  {formatDate({ date: timeDiscount.endDate, hoursView: true })}h
                </Text>
              </WrapperDates>
            </TimeDiscountWrapper>
          </Col>
        ))}
      </Row>
    </TimeDiscountContentContainer>
  )
}

