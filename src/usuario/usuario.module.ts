import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Usuario } from './usuario.entity';

@Module({
  imports : [ MikroOrmModule.forFeature([ Usuario ]) ],
  providers: [UsuarioService],
  controllers: [UsuarioController],
})
export class UsuarioModule {}
