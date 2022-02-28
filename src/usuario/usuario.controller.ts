import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Usuario } from './usuario.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { LoadStrategy, LockMode, MikroORM, wrap } from '@mikro-orm/core';

@Controller('usuario')
export class UsuarioController {
    constructor (@InjectRepository(Usuario) private readonly usuarioRepository: EntityRepository<Usuario>, private readonly em:EntityManager){}


    @Get()
    async find(){
        
        return await this.em.find(Usuario, {}, {
            populate: [], 
            strategy: LoadStrategy.JOINED,
            lockMode: LockMode.NONE,
            lockTableAliases: ['e0'],
            
        }); 
        
    }
    
    @Get(':uuid')
    async findOne(@Param() uuid: string) {
        const usuario = await this.usuarioRepository.findOne(uuid);
        if (!usuario) {
        throw new HttpException('Usuario no encontrada', HttpStatus.NOT_FOUND);
        }
        return usuario;
    }

    @Post()
    async create(@Body() body: any) {
        if (!body.usuario) {
        throw new HttpException('No se pudo crear el usuario', HttpStatus.BAD_REQUEST);
        }
        const em = this.em.fork();
        await em.begin();  
    try {
        const usuario = new Usuario(body.usuario, body.nombre, body.apellidoPaterno, body.apellidoMaterno);
        await this.usuarioRepository.persistAndFlush(usuario);
        return usuario;
        } 
    catch (e) {
        await em.rollback();
        throw e;
        }
    }
}
