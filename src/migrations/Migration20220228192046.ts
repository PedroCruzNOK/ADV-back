import { Migration } from '@mikro-orm/migrations';

export class Migration20220228192046 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "empleado" ("uuid" uuid not null default uuid_generate_v4(), "nombre" varchar(255) not null, "apellido_paterno" varchar(255) not null, "apellido_materno" varchar(255) not null, "fechaingreso" timestamptz(0) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "empleado" add constraint "empleado_pkey" primary key ("uuid");');

    this.addSql('create table "vacacion" ("uuid" uuid not null default uuid_generate_v4(), "descripcion" varchar(255) not null, "empleado_uuid" uuid not null, "fecha" timestamptz(0) not null, "estado" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "vacacion" add constraint "vacacion_pkey" primary key ("uuid");');

    this.addSql('alter table "vacacion" add constraint "vacacion_empleado_uuid_foreign" foreign key ("empleado_uuid") references "empleado" ("uuid") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "vacacion" drop constraint "vacacion_empleado_uuid_foreign";');

    this.addSql('drop table if exists "empleado" cascade;');

    this.addSql('drop table if exists "vacacion" cascade;');
  }

}
