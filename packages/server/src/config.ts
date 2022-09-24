import { AppEnvironments } from './enums/app-environments.enum';

export const appConfig = {
  environment: process.env.NODE_ENV,
  http: {
    port: process.env.HTTP_PORT ?? 3858,
  },
  logger: {
    pretty: [AppEnvironments.development, AppEnvironments.test].includes(
      process.env.NODE_ENV ?? 'development'
    ),
    sync: [AppEnvironments.test].includes(process.env.NODE_ENV ?? 'development'),
  },
};

export type AppConfig = typeof appConfig;
