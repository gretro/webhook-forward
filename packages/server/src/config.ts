export const appConfig = {
  environment: process.env.NODE_ENV,
  http: {
    port: process.env.HTTP_PORT,
  },
};

export type AppConfig = typeof appConfig;
