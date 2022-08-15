import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerResponse } from 'node:http';
import type { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { RequestWithUser } from '../auth/google.strategy';

const isDev = process.env.NODE_ENV === 'development';

export type GraphQLContext = {
  req: RequestWithUser;
  res: ServerResponse;
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      url: process.env.DB_URL,
      type: 'mongodb',
      entities: ['../**/*.entity.js'],
      autoLoadEntities: true,
      synchronize: isDev,
      cli: {
        entitiesDir: '../**/entities',
        migrationsDir: 'migrations',
        subscribersDir: 'subscribers',
      },
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepConnectionAlive: true,
      logging: true,
    } as MongoConnectionOptions),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: isDev ? 'schema.graphql' : true,
      context: ({ req, res }): GraphQLContext => ({ req, res }),
    }),
  ],
})
export class DataModule {}
