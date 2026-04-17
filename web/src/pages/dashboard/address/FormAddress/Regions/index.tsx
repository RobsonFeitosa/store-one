import { useEffect, useMemo, useState } from 'react'
import { RegionsContainer } from './styles'
import { useGetAllStates } from '@/hooks/useGetAllStates'
import { Control, Controller } from 'react-hook-form'
import { SelectInput } from '@/components/SelectInput'
import { useGetAllCityByState } from '@/hooks/useGetAllCityByState'
import { slugfy } from '@/utils/slug'
import { AddressFormData } from '..'

interface RegionsProps {
  control: Control<AddressFormData>
}

export default function Regions({ control }: RegionsProps) {
  const [stateCurrent, setStateCurrent] = useState('')

  const { data: stateFound, refetch: getAllStates } = useGetAllStates()

  useEffect(() => {
    getAllStates()
  }, [getAllStates])

  const stateOptions = useMemo(() => {
    const states = stateFound?.data || []

    return states.map((state) => ({
      label: state.nome,
      value: state.sigla,
    }))
  }, [stateFound])

  const { data: citiesFound, refetch: getAllCities } =
    useGetAllCityByState(stateCurrent)

  useEffect(() => {
    if (stateCurrent) {
      getAllCities()
    }
  }, [stateCurrent, getAllCities])

  const citiesOptions = useMemo(() => {
    const cities = citiesFound?.data || []

    return cities.map((city) => ({
      label: city.nome,
      value: slugfy(city.nome),
    }))
  }, [citiesFound])

  return (
    <RegionsContainer>
      <Controller
        control={control}
        name="state"
        render={({
          field: { onChange, name, value },
          fieldState: { error },
        }) => {
          return (
            <SelectInput
              options={stateOptions}
              placeholder="Estado"
              defaultValue={
                value
                  ? {
                      label: String(value),
                      value: String(value),
                    }
                  : undefined
              }
              onChange={(data) => {
                setStateCurrent(value)
                onChange(data.value)
              }}
              error={error ? 'O estado é obrigatório.' : undefined}
              name={name}
            />
          )
        }}
      />

      <Controller
        control={control}
        name="city"
        render={({
          field: { onChange, name, value },
          fieldState: { error },
        }) => {
          return (
            <SelectInput
              options={citiesOptions}
              placeholder="Cidade"
              defaultValue={
                value
                  ? {
                      label: String(value),
                      value: String(value),
                    }
                  : undefined
              }
              onChange={(data) => onChange(data.value)}
              error={error ? 'O cidade é obrigatório.' : undefined}
              name={name}
            />
          )
        }}
      />
    </RegionsContainer>
  )
}
