import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';

console.log('process.env.DB_URL', process.env.DB_URL);
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      // username: 'root',
      // password: 'root',
      database: 'bloup',
      entities: ['dist/**/*.entity.js'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    // MongooseModule.forRoot(process.env.DB_URL),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
