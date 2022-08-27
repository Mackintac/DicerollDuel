process.env.NODE_ENV = 'test';
import { app } from 'src/server';
import { cfg } from 'src/util/env';
import supertest from 'supertest';

describe('check_auth integration testing suite', () => {
  it('should return status 401 not authorized', async () => {
    const res = await supertest(app).delete(cfg.ep.accounts);

    expect(res.status).toEqual(401);
  });
  it('should return status 200', async () => {
    const res = await supertest(app).get(cfg.ep.accounts);

    expect(res.status).toEqual(200);
  });
});
