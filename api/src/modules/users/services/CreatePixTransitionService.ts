import { injectable, inject } from 'tsyringe'

import UserTransactions from '../infra/typeorm/entities/UserTransactions'
import IUserTransactionsRepository from '../repositories/IUserTransactionsRepository'
import ICreateUserTransactionsDTO from '../dtos/ICreateUserTransactionsDTO'

interface IRequest {
  data: Omit<ICreateUserTransactionsDTO, 'id'>
  user_id: string
}

@injectable()
class CreatePixTransactionService {
  constructor(
    @inject('UserTransactionsRepository')
    private userTransactionsRepository: IUserTransactionsRepository,
  ) {}

  public async execute({ user_id, data }: IRequest): Promise<UserTransactions> {
    const userTransaction = await this.userTransactionsRepository.create({
      user_id,
      amount: data.amount,
      brand: data.brand,
      order_id: data.order_id,
      payment_method: 'pix',
      status: data.status,
      tid: data.tid,
    })

    return userTransaction
  }
}

export default CreatePixTransactionService
