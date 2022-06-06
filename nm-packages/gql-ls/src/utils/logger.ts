import type TSL from 'typescript/lib/tsserverlibrary';
import { Config } from '../config';

export type Logger = ReturnType<typeof createLogger>;

export const createLogger = (
  config: Config,
  logger: Pick<TSL.server.Logger, 'info'>
) => {
  const log = (message: string) => logger.info(`[gql-ls] ${message}`);

  return {
    log,
    error: (message: string) => {
      log(`Error ${message}`);
    },
    verbose: (message: string) => {
      if (!config.verbose) {
        return;
      }

      log(message);
    },
  };
};
