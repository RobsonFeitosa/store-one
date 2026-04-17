import { Container, Row } from 'react-bootstrap'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Text } from '@lemonade-technologies-hub-ui/react'
import { EnvelopeSimpleOpen } from 'phosphor-react'
import { useForm } from 'react-hook-form'

import {
  ButtonNewsletter,
  Form,
  Hr,
  NewsletterContainer,
  NewsletterContent,
  NewsletterLabels,
  TextInputCustom,
} from './styles'

const newsletterForm = z.object({
  newsletter: z.string(),
})

export type NewsletterFormData = z.infer<typeof newsletterForm>

export default function Newsletter() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterForm),
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function handleRegister(data: NewsletterFormData) {
    // console.log({ data })
  }

  return (
    <NewsletterContainer>
      <Container>
        <Row>
          <NewsletterContent>
            <NewsletterLabels>
              <EnvelopeSimpleOpen size={33} />
              <Text>inscreva-se no boletim informativo</Text>
            </NewsletterLabels>
            <div>
              <Form as="form" onSubmit={handleSubmit(handleRegister)}>
                <TextInputCustom
                  size="md"
                  placeholder="email@example.com"
                  error={errors.newsletter?.message}
                  {...register('newsletter')}
                />
                <Hr />
                <ButtonNewsletter type="submit" disabled={isSubmitting}>
                  se inscrever
                </ButtonNewsletter>
              </Form>
            </div>
          </NewsletterContent>
        </Row>
      </Container>
    </NewsletterContainer>
  )
}
