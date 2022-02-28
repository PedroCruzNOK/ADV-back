import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpleadoModule } from './empleado/empleado.module';
import { VacacionModule } from './vacacion/vacacion.module';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      
    }),
    EmpleadoModule,
    VacacionModule,
    

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
