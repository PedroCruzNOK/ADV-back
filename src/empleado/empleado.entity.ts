import { Cascade, Collection, Entity, ManyToOne, OneToMany, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Usuario } from '../usuario/usuario.entity';
import { Dependencia } from '../dependencia/dependencia.entity';
import { Vacacion } from '../vacacion/vacacion.entity';


@Entity()
export class Empleado{

    @PrimaryKey({  type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
    uuid! : string;

    @ManyToOne(() => Usuario)
    usuario: Usuario;

    @Property({ concurrencyCheck: true })
    fechaingreso: Date;

    @ManyToOne(() => Dependencia)
    dependencia: Dependencia;

    @OneToMany(() => Vacacion, b => b.empleado, { cascade: [Cascade.ALL] })
    vacacion = new Collection<Vacacion>(this);

    @Property()
    createdAt = new Date();

    @Property({ onUpdate : () =>  new Date() })
    updatedAt = new Date();

    constructor( usuario: Usuario, fechaIngreso: Date, dependencia: Dependencia) {
        
        this.usuario = usuario;
        this.fechaingreso= fechaIngreso;
        this.dependencia = dependencia;
    }


}