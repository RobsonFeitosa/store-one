import Address from '../infra/typeorm/entities/Address'

type ICreateAddressDTO = Omit<Address, 'id' | 'created_at' | 'updated_at'>

export default ICreateAddressDTO
