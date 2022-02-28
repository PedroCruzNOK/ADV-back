import { Entity, ManyToOne, PrimaryKey, Property, OneToMany, Collection, Cascade} from '@mikro-orm/core';
import { Empleado } from '../empleado/empleado.entity';

@Entity()
export class Vacacion{

    @PrimaryKey({  type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
    uuid! : string;

    @Property()
    descripcion: string;

    @ManyToOne(() => Empleado)
    empleado: Empleado;

    @Property()
    fecha: Date;

    @Property()
    estado: string;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate : () =>  new Date() })
    updatedAt = new Date();

    constructor( descripcion: string, empleado: Empleado, fecha: Date, estado: string) {
        this.descripcion = descripcion;
        this.empleado = empleado;
        this.fecha = fecha;
        this.estado = estado;
        
    }


}