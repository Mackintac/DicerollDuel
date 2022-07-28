import 'reflect-metadata';
import 'module-alias/register';
import { cfg } from 'src/util/env';
import { app } from 'src/server';
import { TypeOrmPGInit } from 'src/db/typeorm';

(async () => {
  try {
    await TypeOrmPGInit();
    console.log('redis connected');
    app.listen(cfg.server.port, () =>
      console.log('live @ ' + cfg.server.path + cfg.server.port)
    );
  } catch (error) {
    console.log((<Error>error).message);
  }
})();
