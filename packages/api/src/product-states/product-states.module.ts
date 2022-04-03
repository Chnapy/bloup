import { Module } from '@nestjs/common';
import { ProductStatesService } from './product-states.service';
import { ProductStatesResolver } from './product-states.resolver';

@Module({
  providers: [ProductStatesResolver, ProductStatesService]
})
export class ProductStatesModule {}
