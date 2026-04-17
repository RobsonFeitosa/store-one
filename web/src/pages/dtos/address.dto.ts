export interface IAddressDTO {
  id: string
  title: string
  zipcode: string
  city: string
  state: string
  country: string
  primary: boolean
  neighborhood: string
  street: string
  street_number: string
  created_at: Date
  updated_at: Date
}

export interface ICreateAddressDTO {
  title: string
  zipcode: string
  city: string
  state: string
  country: string
  primary?: boolean | undefined
  neighborhood: string
  street: string
  street_number: string
}
