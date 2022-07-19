import 'reflect-metadata';
import 'module-alias/register';
import express from 'express';
import { cfg } from 'src/util/env';
const app = express();

app.get('/', (req, res) => {
  res.send('hello world!');
});

app.listen(cfg.server.port, () => {
  console.log(`App is listening on port # ${cfg.server.port}`);
});
