process.env.NODE_ENV = 'test';
import { app } from 'src/server';
import { cfg } from 'src/util/env';
import supertest from 'supertest';

describe('cors middleware testing suite', () => {
  it('should return negative access message', async () => {
    const res = await supertest(app)
      .get(cfg.ep.accounts)
      .set('Origin', '10321214321.412');

    expect(res.status).toBe(500);
  });
  it('should return negative access message', async () => {
    const res = await supertest(app).get(cfg.ep.accounts);

    expect(res.status).toBe(200);
  });
});
