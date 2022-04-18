import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import type { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

const isDev = process.env.NODE_ENV === 'development';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      url: process.env.DB_URL,
      type: 'mongodb',
      entities: ['../**/*.entity.js'],
      autoLoadEntities: true,
      synchronize: true,
      cli: {
        entitiesDir: '../**/entities',
        migrationsDir: 'migrations',
        subscribersDir: 'subscribers',
      },
    } as MongoConnectionOptions),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: isDev ? 'schema.graphql' : true,
    }),
  ],
})
export class DataModule {}
