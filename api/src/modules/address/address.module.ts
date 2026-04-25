import { Module } from '@nestjs/common'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Address } from './domain/entities/address.entity'
import { TypeOrmAddressRepository } from './infra/database/repositories/typeorm-address.repository'
import { AddressController } from './infra/http/controllers/address.controller'
import { CreateAddressUseCase } from './application/create-address.use-case'
import { IndexAddressUseCase } from './application/index-address.use-case'
import { ShowAddressUseCase } from './application/show-address.use-case'
import { UpdateAddressUseCase } from './application/update-address.use-case'
import { UpdatePrimaryAddressUseCase } from './application/update-primary-address.use-case'
import { DeleteAddressUseCase } from './application/delete-address.use-case'
import { ShowIsPrimaryAddressUseCase } from './application/show-is-primary-address.use-case'

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [AddressController],
  providers: [
    CreateAddressUseCase,
    IndexAddressUseCase,
    ShowAddressUseCase,
    UpdateAddressUseCase,
    UpdatePrimaryAddressUseCase,
    DeleteAddressUseCase,
    ShowIsPrimaryAddressUseCase,
    {
      provide: 'ADDRESS_REPOSITORY_TOKEN',
      useFactory: (ormRepo: Repository<Address>) =>
        new TypeOrmAddressRepository(ormRepo),
      inject: [getRepositoryToken(Address)],
    },
  ],
  exports: ['ADDRESS_REPOSITORY_TOKEN'],
})
export class AddressModule {}
