import { Module } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { EmpleadoController } from './empleado.controller';
import { Empleado } from './empleado.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports : [ MikroOrmModule.forFeature([ Empleado ]) ],
  providers: [EmpleadoService],
  controllers: [EmpleadoController],
})
export class EmpleadoModule {}
