import { Logger, Module } from '@nestjs/common';
import { ConfigModule as ConfigModuleNest } from '@nestjs/config';
import joi from 'joi';
import { requiredEnvsSchema } from '../auth/google.strategy';

const envFileNames = {
  development: '.env.dev',
  staging: '.env.staging',
  production: '.env.prod',
  test: '.env.test',
};

const nodeEnv = joi
  .string()
  .valid(...Object.keys(envFileNames))
  .default('development')
  .validate(process.env.NODE_ENV).value as keyof typeof envFileNames;

Logger.log(`NODE_ENV=${nodeEnv}`, 'env');

@Module({
  imports: [
    ConfigModuleNest.forRoot({
      envFilePath: [envFileNames[nodeEnv], '.env.local'],
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validationSchema: joi
        .object({
          PORT: joi.number().required(),
          DB_URL: joi.string().required(),
        })
        // eslint-disable-next-line unicorn/prefer-spread
        .concat(requiredEnvsSchema),
      validationOptions: {
        abortEarly: true,
      },
    }),
  ],
})
export class ConfigModule {}
