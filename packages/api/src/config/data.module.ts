import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      // username: 'root',
      // password: 'root',
      database: 'bloup',
      entities: ['../**/*.entity.js'],
      autoLoadEntities: true,
      synchronize: true,
      cli: {
        entitiesDir: '../**/entities',
        migrationsDir: 'migrations',
        subscribersDir: 'subscribers',
      }
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.graphql',
    }),
  ],
})
export class DataModule {}
