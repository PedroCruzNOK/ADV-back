import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config: Options ={
    type:'postgresql',
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'simons83',
    dbName: 'advdatabase',
    entities: ['dist/**/*.entity.js'],
    entitiesTs:  ['src/**/*.entity.ts'],
    metadataProvider:TsMorphMetadataProvider,
    migrations: {
        path:'./src/migrations',
        glob: "!(*.d).{js,ts}",
    }

};

export default config;