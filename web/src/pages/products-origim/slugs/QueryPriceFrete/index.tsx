import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Button,
  Dialog,
  DialogRoot,
  TextInputMask,
} from '@lemonade-technologies-hub-ui/react'
import { MagnifyingGlass } from 'phosphor-react'
import { useState } from 'react'
import ShippingAndDeadline from './ShippingAndDeadline'
import { Form, QueryPriceFreteContainer } from './styles'

const searchForm = z.object({
  search: z.string(),
})

export type SearchFormData = z.infer<typeof searchForm>

export default function QueryPriceFrete() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchForm),
  })

  const [openModal, setOpenModal] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function handleRegister(data: SearchFormData) {
    setOpenModal(true)
  }

  return (
    <>
      <DialogRoot open={openModal}>
        <Dialog offClosed title="Frete e prazo">
          <ShippingAndDeadline onClose={() => setOpenModal(false)} />
        </Dialog>
      </DialogRoot>

      <QueryPriceFreteContainer>
        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <TextInputMask
            mask="99999-999"
            placeholder="Informe o CEP"
            error={errors.search?.message}
            {...register('search')}
          />

          <Button type="submit" disabled={isSubmitting}>
            <MagnifyingGlass size={18} />
            Pesquisar
          </Button>
        </Form>
      </QueryPriceFreteContainer>
    </>
  )
}
