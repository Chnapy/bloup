import { Resolver } from '@nestjs/graphql';
import { ProductStatesService } from './product-states.service';

@Resolver()
export class ProductStatesResolver {
  constructor(private readonly productStatesService: ProductStatesService) {}
}
