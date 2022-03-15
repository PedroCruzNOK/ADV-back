import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpleadoModule } from './empleado/empleado.module';
import { VacacionModule } from './vacacion/vacacion.module';
import { DependenciaModule } from './dependencia/dependencia.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      
    }),
    EmpleadoModule,
    VacacionModule,
    DependenciaModule,
    UsuarioModule,
    AuthModule,
    

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
