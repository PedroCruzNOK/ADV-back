import { Module } from '@nestjs/common';
import { VacacionService } from './vacacion.service';
import { VacacionController } from './vacacion.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Vacacion } from './vacacion.entity';

@Module({
  imports : [ MikroOrmModule.forFeature([ Vacacion ]) ],
  providers: [VacacionService],
  controllers: [VacacionController],
})
export class VacacionModule {}
