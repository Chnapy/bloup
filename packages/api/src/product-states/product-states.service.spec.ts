import { Test, TestingModule } from '@nestjs/testing';
import { ProductStatesService } from './product-states.service';

describe('ProductStatesService', () => {
  let service: ProductStatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductStatesService],
    }).compile();

    service = module.get<ProductStatesService>(ProductStatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
