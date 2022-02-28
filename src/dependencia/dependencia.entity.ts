import { Entity, ManyToOne, PrimaryKey, Property, OneToMany, Collection, Cascade} from '@mikro-orm/core';
import { Usuario } from '../usuario/usuario.entity';
import { Empleado } from '../empleado/empleado.entity';

@Entity()
export class Dependencia{

    @PrimaryKey({  type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
    uuid! : string;

    @Property()
    direccion: string;

    @ManyToOne(() => Usuario)
    encargado: Usuario;

    @OneToMany(() => Empleado, b => b.dependencia, { cascade: [Cascade.ALL] })
    empleado = new Collection<Empleado>(this);

    @Property()
    createdAt = new Date();

    @Property({ onUpdate : () =>  new Date() })
    updatedAt = new Date();

    constructor( direccion: string, encargado:Usuario ) {
        this.direccion = direccion;
        this.encargado = encargado;
  
        
    }


}