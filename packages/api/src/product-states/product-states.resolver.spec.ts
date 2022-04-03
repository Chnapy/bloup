import { Test, TestingModule } from '@nestjs/testing';
import { ProductStatesResolver } from './product-states.resolver';
import { ProductStatesService } from './product-states.service';

describe('ProductStatesResolver', () => {
  let resolver: ProductStatesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductStatesResolver, ProductStatesService],
    }).compile();

    resolver = module.get<ProductStatesResolver>(ProductStatesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
