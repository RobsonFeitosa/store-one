import AdminLayout from '@/components/components/Layout/Admin'
import { useAuth } from '@/hooks/providers/auth'
import Calendar from './Calendar'
import { Col, Row } from 'react-bootstrap'

export default function Schedule() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <AdminLayout>
      <Row>
        <Col md={12} lg={12} className='mt-3'>
          <Calendar />
        </Col>
      </Row>
    </AdminLayout>
  )
}
