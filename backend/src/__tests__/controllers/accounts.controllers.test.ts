process.env.NODE_ENV = 'test';
import { app } from 'src/server';
import supertest from 'supertest';
// import bc from 'bcryptjs';
import { cfg } from 'src/util/env';
import { util_delete_account_query } from 'src/db/sql/util.sql';
import { dbq } from 'src/db/mainDB';

describe('ep testing /Accounts', () => {
  describe('Delete Account request testing', () => {
    it('status should return 400 if no email in body', async () => {
      const account = supertest.agent(app);
      await account
        .post(cfg.ep.login)
        .send({ username: 'smackgr', password: 'smackpass' });

      const res = await account.delete(cfg.ep.accounts).send({});
      expect(res.status).toBe(400);
    });

    it('status should return 404 if username/email do not match', async () => {
      const account = supertest.agent(app);

      await account
        .post(cfg.ep.login)
        .send({ username: 'smackgr', password: 'smackpass' });

      const res = await account.delete(cfg.ep.accounts).send({
        username: 'smackgr',
        email: 'dsadsadsa@gmail.com',
      });
      expect(res.status).toEqual(404);
    });

    it('status should return 200 if username/email DO match', async () => {
      const account = supertest.agent(app);
      await account
        .post(cfg.ep.login)
        .send({ username: 'smackgr', password: 'smackpass' });

      const res = await account.delete(cfg.ep.accounts).send({
        username: 'smackgr',
        email: 'mackintac@mack.com',
      });
      expect(res.status).toEqual(200);
    });
  });

  describe('Post Account request testing', () => {
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

      // deletes this account to allow for easy repeatable testing
      await dbq({ query: util_delete_account_query });
    });
  });

  describe('Get account and get accounts request testing', () => {
    it('should return 404 status if account does not exist', async () => {
      const res = await supertest(app).get(cfg.ep.accounts + '/4');

      expect(res.status).toEqual(404);
    });
    it('should return 200 status if account DOES exist', async () => {
      const res = await supertest(app).get(cfg.ep.accounts + '/1');

      expect(res.status).toEqual(200);
    });

    it('should return 200 status and json object', async () => {
      const res = await supertest(app).get(cfg.ep.accounts);

      expect(JSON.parse(res.text)).toBeInstanceOf(Object);
      expect(res.status).toEqual(200);
    });
  });

  describe('Profile EP testing', () => {
    it('should return 200 status and json object', async () => {
      const account = supertest.agent(app);

      await account
        .post(cfg.ep.login)
        .send({ username: 'smackgr', password: 'smackpass' });

      const res = await account.get(cfg.ep.profile);

      expect(JSON.parse(res.text)).toBeInstanceOf(Object);
      expect(res.status).toEqual(200);
    });
  });

  describe('Put Account request testing', () => {
    it('should return status 403 with lack of email', async () => {
      const account = supertest.agent(app);

      await account
        .post(cfg.ep.login)
        .send({ username: 'smackgr', password: 'smackpass' });

      const res = await account.put(cfg.ep.accounts).send({
        username: 'smackgr',
        password: 'smackpas',
        // email: 'mackack.com',
        first_name: 'Mike',
        last_name: 'Jeff',
      });
      expect(res.status).toEqual(403);
    });

    it('should return status 403 with lack of matching email', async () => {
      const account = supertest.agent(app);

      await account
        .post(cfg.ep.login)
        .send({ username: 'smackgr', password: 'smackpass' });

      const res = await account.put(cfg.ep.accounts).send({
        username: 'smackgr',
        password: 'smackpas',
        email: 'mackack.com',
        first_name: 'Mike',
        last_name: 'Jeff',
      });
      expect(res.status).toEqual(403);
    });
    it('should return status 200 with valid username/password combo', async () => {
      const account = supertest.agent(app);

      await account
        .post(cfg.ep.login)
        .send({ username: 'smackgr', password: 'smackpass' });

      const res = await account.put(cfg.ep.accounts).send({
        username: 'smackgr',
        password: 'smackpass',
        email: 'mackintac@mack.com',
        first_name: 'Mike',
        last_name: 'Jeff',
      });
      expect(res.status).toEqual(200);
    });

    it('should STILL return status 200 with firstname, lastname, and password excluded from json body ', async () => {
      const account = supertest.agent(app);

      await account
        .post(cfg.ep.login)
        .send({ username: 'smackgr', password: 'smackpass' });

      const res = await account.put(cfg.ep.accounts).send({
        username: 'smackgr',
        email: 'mackintac@mack.com',
      });
      expect(res.status).toEqual(200);
    });
  });
});
