import { makeEnum } from './enum';

export type AppEnvironment = 'development' | 'test' | 'staging' | 'production';

export const AppEnvironments = makeEnum<AppEnvironment>(
  'development',
  'test',
  'staging',
  'production'
);
