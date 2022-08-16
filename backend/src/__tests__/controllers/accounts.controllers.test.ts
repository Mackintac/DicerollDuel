process.env.NODE_ENV = 'test';
import { app } from 'src/server';
import supertest from 'supertest';
// import bc from 'bcryptjs';
import { cfg } from 'src/util/env';
import { util_delete_account_query } from 'src/db/sql/util.sql';
import { dbq } from 'src/db/mainDB';

describe('ep testing /Accounts', () => {
  describe('Post Account request testing', () => {
    afterAll(() => {
      app.off;
    });
    it('status should return 400 if body is incomplete', async () => {
      const res = await supertest(app).post(cfg.ep.accounts).send({
        email: 'mackintac@mack.com',
        first_name: 'Mike',
        last_name: 'Jeff',
      });

      expect(res.status).toEqual(400);
    });

    it('status should return 403 if information already exists on db', async () => {
      const account = supertest(app);
      await account.post(cfg.ep.accounts).send({
        username: 'smackgr',
        password: 'smackpass',
        email: 'mackintac@mack.com',
        first_name: 'Mike',
        last_name: 'Jeff',
      });

      const res = await account.post(cfg.ep.accounts).send({
        username: 'smackgr',
        password: 'smackpass',
        email: 'mackintac@mack.com',
        first_name: 'Mike',
        last_name: 'Jeff',
      });

      expect(res.status).toEqual(403);
    });
    it('status should be 200 with all fields populated', async () => {
      const account = supertest(app);

      const res = await account.post(cfg.ep.accounts).send({
        username: 'smackga',
        password: 'smackpasa',
        email: 'mackintac@mack.cam',
        first_name: 'Miks',
        last_name: 'Jefa',
      });

      expect(res.status).toEqual(200);
      await dbq({ query: util_delete_account_query });
    });
  });
});
