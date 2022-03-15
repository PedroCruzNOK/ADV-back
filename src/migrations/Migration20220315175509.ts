import { Migration } from '@mikro-orm/migrations';

export class Migration20220315175509 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "usuario" ("uuid" uuid not null default uuid_generate_v4(), "usuario" varchar(255) not null, "password" varchar(255) not null, "nombre" varchar(255) not null, "apellido_paterno" varchar(255) not null, "apellido_materno" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "usuario" add constraint "usuario_pkey" primary key ("uuid");');

    this.addSql('create table "dependencia" ("uuid" uuid not null default uuid_generate_v4(), "direccion" varchar(255) not null, "encargado_uuid" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "dependencia" add constraint "dependencia_pkey" primary key ("uuid");');

    this.addSql('create table "empleado" ("uuid" uuid not null default uuid_generate_v4(), "usuario_uuid" uuid not null, "fechaingreso" timestamptz(0) not null, "dependencia_uuid" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "empleado" add constraint "empleado_pkey" primary key ("uuid");');

    this.addSql('create table "vacacion" ("uuid" uuid not null default uuid_generate_v4(), "descripcion" varchar(255) not null, "empleado_uuid" uuid not null, "fecha" timestamptz(0) not null, "estado" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "vacacion" add constraint "vacacion_pkey" primary key ("uuid");');

    this.addSql('alter table "dependencia" add constraint "dependencia_encargado_uuid_foreign" foreign key ("encargado_uuid") references "usuario" ("uuid") on update cascade;');

    this.addSql('alter table "empleado" add constraint "empleado_usuario_uuid_foreign" foreign key ("usuario_uuid") references "usuario" ("uuid") on update cascade;');
    this.addSql('alter table "empleado" add constraint "empleado_dependencia_uuid_foreign" foreign key ("dependencia_uuid") references "dependencia" ("uuid") on update cascade;');

    this.addSql('alter table "vacacion" add constraint "vacacion_empleado_uuid_foreign" foreign key ("empleado_uuid") references "empleado" ("uuid") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "dependencia" drop constraint "dependencia_encargado_uuid_foreign";');

    this.addSql('alter table "empleado" drop constraint "empleado_usuario_uuid_foreign";');

    this.addSql('alter table "empleado" drop constraint "empleado_dependencia_uuid_foreign";');

    this.addSql('alter table "vacacion" drop constraint "vacacion_empleado_uuid_foreign";');

    this.addSql('drop table if exists "usuario" cascade;');

    this.addSql('drop table if exists "dependencia" cascade;');

    this.addSql('drop table if exists "empleado" cascade;');

    this.addSql('drop table if exists "vacacion" cascade;');
  }

}
