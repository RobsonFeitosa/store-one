import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './shared/infra/database/database.module';
import { UserModule } from './modules/user/user.module';
import { ArchiveModule } from './modules/archive/archive.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { StorageModule } from './shared/infra/http/providers/storage-provider/storage.module';
import { MessageBrokerModule } from './shared/infra/http/providers/message-broker-provider/message-broker.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './shared/infra/http/guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    ArchiveModule,
    ProductModule,
    OrderModule,
    StorageModule.register(),
    MessageBrokerModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }