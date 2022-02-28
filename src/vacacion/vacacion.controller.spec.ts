import { Test, TestingModule } from '@nestjs/testing';
import { VacacionController } from './vacacion.controller';

describe('VacacionController', () => {
  let controller: VacacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VacacionController],
    }).compile();

    controller = module.get<VacacionController>(VacacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
