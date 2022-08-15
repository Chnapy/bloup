import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = app.get(ConfigService).get('PORT');
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: \n\t- http://localhost:${port}/${globalPrefix}\n\t- http://localhost:${port}/graphql`
  );
};

bootstrap();
