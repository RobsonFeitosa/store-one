import { IAddressDTO } from '@/pages/dtos/address.dto'
import { AddressContent, BtnPrimary } from '../styles'
import { AddressesListContainer } from './styles'
import { Text } from '@lemonade-technologies-hub-ui/react'
import { useUpdatePrimaryAddress } from '@/hooks/useUpdatePrimaryAddress'
import { useEffect, useState } from 'react'

interface AddressesListProps {
  addresses: IAddressDTO[]
  onSuccessPrimary: () => void
}

export default function AddressesList({
  addresses,
  onSuccessPrimary,
}: AddressesListProps) {
  const [addressId, setAddressId] = useState('')

  const { isSuccess, mutateAsync: updatePrimaryAddress } =
    useUpdatePrimaryAddress(addressId)

  async function handlePrimaryAddres(addressId: string) {
    setAddressId(addressId)
  }

  useEffect(() => {
    updatePrimaryAddress()
  }, [updatePrimaryAddress])

  useEffect(() => {
    if (isSuccess) {
      onSuccessPrimary()
    }
  }, [isSuccess, onSuccessPrimary])

  return (
    <AddressesListContainer>
      {addresses.map(
        (address) =>
          !address.primary && (
            <AddressContent key={address.id}>
              <BtnPrimary onClick={() => handlePrimaryAddres(address.id)}>
                <Text as="strong">{address.title}</Text>
                <Text>
                  {`${address.neighborhood}, ${address.street}, ${address.street_number}`}
                </Text>
              </BtnPrimary>
            </AddressContent>
          ),
      )}
    </AddressesListContainer>
  )
}
