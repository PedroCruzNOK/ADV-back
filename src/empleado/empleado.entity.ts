import { Cascade, Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Vacacion } from '../vacacion/vacacion.entity';


@Entity()
export class Empleado{

    @PrimaryKey({  type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
    uuid! : string;

    @Property({ concurrencyCheck: true })
    nombre: string;

    @Property({ concurrencyCheck: true })
    apellidoPaterno: string;

    @Property({ concurrencyCheck: true })
    apellidoMaterno: string;

    @Property({ concurrencyCheck: true })
    fechaingreso: Date;

    @OneToMany(() => Vacacion, b => b.empleado, { cascade: [Cascade.ALL] })
    vacacion = new Collection<Vacacion>(this);

    @Property()
    createdAt = new Date();

    @Property({ onUpdate : () =>  new Date() })
    updatedAt = new Date();

    constructor(nombre: string, apellidoPaterno: string, apellidoMaterno: string, fechaIngreso: Date) {
        
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.fechaingreso= fechaIngreso;
    }


}