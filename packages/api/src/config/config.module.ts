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

const nodeEnvSchema = joi
  .string()
  .required()
  .valid(...Object.keys(envFileNames));

const nodeEnv = nodeEnvSchema.validate(process.env.NODE_ENV)
  .value as keyof typeof envFileNames;

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
          NODE_ENV: nodeEnvSchema,
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
