import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Empleado } from './empleado.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { LoadStrategy, LockMode, MikroORM, wrap } from '@mikro-orm/core';

@Controller('empleado')
export class EmpleadoController {
    constructor (@InjectRepository(Empleado) private readonly empleadoRepository: EntityRepository<Empleado>, private readonly em:EntityManager){}


    @Get()
    async find(){
        
        return await this.em.find(Empleado, {}, {
            populate: [], 
            strategy: LoadStrategy.JOINED,
            lockMode: LockMode.NONE,
            lockTableAliases: ['e0'],
            
        }); 
        
    }
    
    @Get(':uuid')
    async findOne(@Param() uuid: string) {
        const empleado = await this.empleadoRepository.findOne(uuid);
        if (!empleado) {
        throw new HttpException('Empleado no encontrada', HttpStatus.NOT_FOUND);
        }
        return empleado;
    }

    @Post()
    async create(@Body() body: any) {
        if (!body.nombre) {
        throw new HttpException('No se pudo crear el empleado', HttpStatus.BAD_REQUEST);
        }
        const em = this.em.fork();
        await em.begin();  
    try {
        const empleado = new Empleado(body.nombre, body.apellidoPaterno, body.apellidoMaterno, body.fechaIngreso);
        await this.empleadoRepository.persistAndFlush(empleado);
        return empleado;
        } 
    catch (e) {
        await em.rollback();
        throw e;
        }
    }
}
