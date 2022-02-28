import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Vacacion } from './vacacion.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { LoadStrategy, wrap, LockMode } from '@mikro-orm/core';

@Controller('vacacion')
export class VacacionController {

    constructor (@InjectRepository(Vacacion) private readonly vacacionRepository: EntityRepository<Vacacion>, private readonly em:EntityManager){}
    @Get()
    async find(){
        const p =  await this.em.find(Vacacion, {}, {
            populate: ['empleado'],
            strategy: LoadStrategy.JOINED,
            lockMode: LockMode.NONE,
            lockTableAliases: ['e0'],
        }); //this.productoRepository.findAll(['categoria'],{nombre: QueryOrder.DESC}, 20);
        return p;
        
    }

    @Get(':uuid')
    async findOne(@Param() uuid: string) {
        const vacacion = await this.vacacionRepository.findOne(uuid);
        if (!vacacion) {
        throw new HttpException('Vacacion no encontrado', HttpStatus.NOT_FOUND);
        }
        return vacacion;
    }

    @Post()
    async create(@Body() body: any) {
        if ( !body.descripcion ) {
        throw new HttpException('No se pudo crear la vacacion ', HttpStatus.BAD_REQUEST);
        }
    const em = this.em.fork();
    await em.begin();  
    try {
        const vacacion = new Vacacion(body.descripcion,body.empleado, body.fecha, body.estado);
        await this.vacacionRepository.persistAndFlush(vacacion);
        return vacacion;
    } catch (e) {
        await em.rollback();
        throw e;
    }
    }

    @Put(':uuid')
    async update(@Param() uuid: string, @Body() body: any) {
        const vacacion = await this.vacacionRepository.findOne(uuid);
        if (!vacacion) {
        throw new HttpException('Vacacion no encontrado', HttpStatus.NOT_FOUND);
        }
    const em = this.em.fork();
    await em.begin();  
    try {
        wrap(vacacion).assign(body);
        await this.vacacionRepository.persistAndFlush(vacacion);
        return vacacion;
    } catch (e) {
        await em.rollback();
        throw e;
    }
    }
    
}
