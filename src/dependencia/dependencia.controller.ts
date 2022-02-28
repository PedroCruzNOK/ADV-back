import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { LoadStrategy, wrap, LockMode } from '@mikro-orm/core';
import { Dependencia } from './dependencia.entity';

@Controller('dependencia')
export class DependenciaController {

    constructor (@InjectRepository(Dependencia) private readonly dependenciaRepository: EntityRepository<Dependencia>, private readonly em:EntityManager){}
    @Get()
    async find(){
        const p =  await this.em.find(Dependencia, {}, {
            populate: ['encargado'],
            strategy: LoadStrategy.JOINED,
            lockMode: LockMode.NONE,
            lockTableAliases: ['e0'],
        }); 
        return p;
        
    }

    @Get(':uuid')
    async findOne(@Param() uuid: string) {
        const dependencia = await this.dependenciaRepository.findOne(uuid);
        if (!dependencia) {
        throw new HttpException('Dependencia no encontrado', HttpStatus.NOT_FOUND);
        }
        return dependencia;
    }

    @Post()
    async create(@Body() body: any) {
        if ( !body.direccion ) {
        throw new HttpException('No se pudo crear la dependencia ', HttpStatus.BAD_REQUEST);
        }
    const em = this.em.fork();
    await em.begin();  
    try {
        const dependencia = new Dependencia( body.direccion, body.encargado);
        await this.dependenciaRepository.persistAndFlush(dependencia);
        return dependencia;
    } catch (e) {
        await em.rollback();
        throw e;
    }
    }

    @Put(':uuid')
    async update(@Param() uuid: string, @Body() body: any) {
        const dependencia = await this.dependenciaRepository.findOne(uuid);
        if (!dependencia) {
        throw new HttpException('Dependencia no encontrado', HttpStatus.NOT_FOUND);
        }
    const em = this.em.fork();
    await em.begin();  
    try {
        wrap(dependencia).assign(body);
        await this.dependenciaRepository.persistAndFlush(dependencia);
        return dependencia;
    } catch (e) {
        await em.rollback();
        throw e;
    }
    }
    
}
