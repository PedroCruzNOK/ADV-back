import { Module } from '@nestjs/common';
import { DependenciaService } from './dependencia.service';
import { DependenciaController } from './dependencia.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Dependencia } from './dependencia.entity';

@Module({
  imports : [ MikroOrmModule.forFeature([ Dependencia ]) ],
  providers: [DependenciaService],
  controllers: [DependenciaController],
})
export class DependenciaModule {}
