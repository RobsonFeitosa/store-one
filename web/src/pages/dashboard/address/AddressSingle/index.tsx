import { IAddressDTO } from '@/pages/dtos/address.dto'
import { Heading, Text } from '@lemonade-technologies-hub-ui/react'
import {
  CheckCircle,
  CheckSquareOffset,
  DotsThreeVertical,
  Pencil,
  Trash,
} from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { useDeleteAddress } from '@/hooks/useDeleteAddress'
import { useToast } from '@/hooks/providers/toast'
import { useGetAllAddress } from '@/hooks/useGetAllAddress'
import { useUpdatePrimaryAddress } from '@/hooks/useUpdatePrimaryAddress'

import {
  Actions,
  ActionsContent,
  AddressHeader,
  AddressSingleContainer,
  BtnAction,
  BtnShowActions,
} from './styles'

interface AddressSingleProps {
  itemsPerPage: number
  address: IAddressDTO
  onLoading: () => void
  onUpdateAddress: (address: IAddressDTO) => void
  onResetPagination: () => void
}

export default function AddressSingle({
  itemsPerPage,
  address,
  onLoading,
  onUpdateAddress,
  onResetPagination,
}: AddressSingleProps) {
  const [showActions, setShowActions] = useState(false)
  const { addToast } = useToast()

  const { isSuccess, mutateAsync: deleteAddressAsync } = useDeleteAddress(
    address.id,
  )
  const { isSuccess: isSucessPrimary, mutateAsync: updatePrimaryAddressAsync } =
    useUpdatePrimaryAddress(address.id)
  const { refetch: getAllAddress } = useGetAllAddress({
    limit: itemsPerPage,
    page: 1,
  })

  function handleShowActions() {
    setShowActions(!showActions)
  }

  function handleRemove() {
    deleteAddressAsync()
  }

  function handleUpdate() {
    onUpdateAddress(address)
  }

  function handlePrimary() {
    updatePrimaryAddressAsync()
  }

  const refBtnActions = useOutsideClick(() => {
    setShowActions(false)
  })

  useEffect(() => {
    if (isSuccess) {
      addToast({
        type: 'success',
        title: 'Endereço deletado com sucesso',
      })

      onLoading()
      setTimeout(() => {
        getAllAddress()
        setShowActions(false)
      }, 400)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  useEffect(() => {
    if (isSucessPrimary) {
      addToast({
        type: 'success',
        title: 'Endereço principal definido',
      })

      onLoading()
      onResetPagination()

      setTimeout(() => {
        getAllAddress()
        setShowActions(false)
      }, 400)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSucessPrimary])

  return (
    <AddressSingleContainer>
      <AddressHeader>
        <Heading as="h4">{address.title}</Heading>

        {address.primary && (
          <Text>
            <CheckCircle size={18} />
            Principal
          </Text>
        )}
      </AddressHeader>

      <Text>
        {address.street}, {address.street_number}, {address.neighborhood} -{' '}
        {address.city}/{address.state}
      </Text>

      <Actions ref={refBtnActions}>
        <BtnShowActions onClick={handleShowActions}>
          <DotsThreeVertical size={33} />
        </BtnShowActions>

        <ActionsContent actived={showActions}>
          <BtnAction onClick={handlePrimary}>
            <CheckSquareOffset size={20} />
            Tornar principal
          </BtnAction>
          <BtnAction onClick={handleUpdate}>
            <Pencil size={20} />
            Atualizar
          </BtnAction>
          <BtnAction onClick={handleRemove}>
            <Trash size={20} />
            Remover
          </BtnAction>
        </ActionsContent>
      </Actions>
    </AddressSingleContainer>
  )
}
