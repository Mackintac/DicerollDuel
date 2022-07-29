import 'reflect-metadata';
import express, { json } from 'express';
import { mw_cors } from 'src/middleware/cors';
import { express_session } from 'src/middleware/redis.session';
import { redis } from 'src/db/redis';
import { router } from 'src/routes/router';
import { prod } from 'src/util/env';

const app = express();

app.set('trust proxy', prod);

app.use(express_session);

app.disable('x-powered-by');
app.options('*', mw_cors);
app.use(mw_cors);

app.use(json());

(async () => {
  app.use(...(await router));

  await redis.connect();
})();

export { app };
