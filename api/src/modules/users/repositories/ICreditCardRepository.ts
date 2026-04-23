import CreditCard from '../infra/typeorm/entities/CreditCard'

import ICreateCreditCardDTO from '../../dtos/ICreateCreditCardDTO'
import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO'

interface IFindAllCreditCard {
  data: CreditCard[]
  total: number
}

export default interface ICreditCardRepository {
  create(creditData: ICreateCreditCardDTO): Promise<CreditCard>
  findById(cardId: string): Promise<CreditCard | null>
  findByCardId(cardId: string): Promise<CreditCard | null>
  findByUserId(userId: string): Promise<CreditCard | null>
  findActived(userId: string): Promise<CreditCard | null>
  findByNumber(number: string): Promise<CreditCard | null>
  Index(
    options: IPaginationOptionsDTO,
    userId: string,
  ): Promise<IFindAllCreditCard>
  delete(cardId: string): Promise<void>
  delete(cardId: string): Promise<void>
  save(creditData: CreditCard): Promise<CreditCard>
}
