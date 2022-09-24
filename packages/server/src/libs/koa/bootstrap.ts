import Router from '@koa/router';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import requestLogger from 'koa-pino-logger';
import { appConfig } from '../../config';
import { UUID } from '../../utils/uuid.utils';
import { getLogger } from '../pino/bootstrap';
import { RegisterRoutes } from '../tsoa/generated/routes';

let koaApp: Koa;

export function getKoa() {
  if (!koaApp) {
    throw new Error('Koa has not been bootstrapped yet');
  }

  return koaApp;
}

function initKoa() {
  const app = new Koa();
  const router = new Router();

  app.use(bodyParser());

  // Registering TSOA routes
  RegisterRoutes(router);

  router.all('/check', (ctx) => {
    ctx.status = 200;
    ctx.body = 'OK!';
  });

  router.all('/ready', (ctx) => {
    ctx.status = 200;
    ctx.body = 'Ready';
  });

  app.use(
    requestLogger({
      genReqId: (req) => {
        const maybeReqId = req.headers['x-request-id'];

        return maybeReqId && typeof maybeReqId === 'string'
          ? maybeReqId.substring(0, 36)
          : UUID.generate();
      },
      logger: getLogger(),
      customLogLevel: (res, err) => {
        if (res.statusCode >= 400 && res.statusCode < 500) {
          return 'warn';
        } else if (res.statusCode >= 500 || err) {
          return 'error';
        } else if (res.statusCode >= 300 && res.statusCode < 400) {
          return 'silent';
        }

        return 'debug';
      },
      redact: ['req.remoteAddress', 'req.remotePort', 'req.headers["user-agent"]'],
    })
  );

  app.use(router.routes()).use(router.allowedMethods());

  return app;
}

export function bootstrapKoa() {
  koaApp = initKoa();

  koaApp.listen(appConfig.http.port, () => {
    getLogger().info(`HTTP Server listening on port ${appConfig.http.port}`);
  });
}
