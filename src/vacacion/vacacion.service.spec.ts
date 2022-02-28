import { Test, TestingModule } from '@nestjs/testing';
import { VacacionService } from './vacacion.service';

describe('VacacionService', () => {
  let service: VacacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VacacionService],
    }).compile();

    service = module.get<VacacionService>(VacacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
