import { Cascade, Collection, Entity, ManyToOne, OneToMany, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Empleado } from '../empleado/empleado.entity';
import { Dependencia } from '../dependencia/dependencia.entity';



@Entity()
export class Usuario{

    @PrimaryKey({  type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
    uuid! : string;

    @Property({ concurrencyCheck: true })
    usuario: string;

    @Property({ concurrencyCheck: true })
    nombre: string;

    @Property({ concurrencyCheck: true })
    apellidoPaterno: string;

    @Property({ concurrencyCheck: true })
    apellidoMaterno: string;

    @OneToMany(() => Dependencia, b => b.encargado, { cascade: [Cascade.ALL] })
    dependencia = new Collection<Dependencia>(this);

    @OneToMany(() => Empleado, b => b.usuario, { cascade: [Cascade.ALL] })
    empleado = new Collection<Empleado>(this);

    @Property()
    createdAt = new Date();

    @Property({ onUpdate : () =>  new Date() })
    updatedAt = new Date();

    constructor(usuario: string, nombre: string, apellidoPaterno: string, apellidoMaterno: string) {
        this.usuario = usuario;
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
    
    }


}