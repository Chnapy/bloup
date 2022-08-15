import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerResponse } from 'node:http';
import { DataSourceOptions } from 'typeorm';
import type { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { RequestWithUser } from '../auth/google.strategy';

const isDev = process.env.NODE_ENV === 'development';

export type GraphQLContext = {
  req: RequestWithUser;
  res: ServerResponse;
};

export const dataSourceOptions: DataSourceOptions = {
  url: process.env.DB_URL,
  type: 'mongodb',
  entities: ['src/**/*.entity.js'],
  synchronize: isDev,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  logging: true,
  // cache: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true,
      keepConnectionAlive: true,
    } as MongoConnectionOptions),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: isDev ? 'schema.graphql' : true,
      context: ({ req, res }): GraphQLContext => ({ req, res }),
    }),
  ],
})
export class DataModule {}
