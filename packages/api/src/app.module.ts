import { ConfigModule } from './config/config.module';

import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { DataModule } from './config/data.module';
import { ProductStatesModule } from './product-states/product-states.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule,
    DataModule,
    UsersModule,
    ProductsModule,
    ProductStatesModule,
  ],
})
export class AppModule {}
