process.env.NODE_ENV = 'test';
import { app } from 'src/server';
import { cfg } from 'src/util/env';
import supertest from 'supertest';

describe('login controller integration testing suite', () => {
  describe('delete login testing', () => {
    it('should return status 409 if no session is connected', async () => {
      const res = await supertest.agent(app).delete(cfg.ep.login).send({});

      expect(res.status).toEqual(409);
    });

    it('should return status 200 if session exists and is successfully destroyed', async () => {
      const curSess = supertest.agent(app);

      await curSess
        .post(cfg.ep.login)
        .send({ username: 'smackgr', password: 'smackpass' });

      const res = await curSess.delete(cfg.ep.login);

      expect(res.status).toEqual(200);
    });
  });

  describe('get login testing', () => {
    it('should return status 200 with negative login msg', async () => {
      const res = await supertest.agent(app).get(cfg.ep.login);

      expect(JSON.parse(res.text)).toStrictEqual({
        status: 'You are not logged in.',
      });
      expect(res.status).toEqual(200);
    });
    it('should return status 200 with positive login msg', async () => {
      const curSess = supertest.agent(app);

      await curSess
        .post(cfg.ep.login)
        .send({ username: 'smackgr', password: 'smackpass' });

      const res = await curSess.get(cfg.ep.login);

      expect(JSON.parse(res.text)).toStrictEqual({
        status: 'You are currently logged in as smackgr.',
      });
      expect(res.status).toEqual(200);
    });
  });

  describe('post login testing', () => {
    it('should return status 409 if session already exists', async () => {
      const curSess = supertest.agent(app);

      await curSess
        .post(cfg.ep.login)
        .send({ username: 'smackgr', password: 'smackpass' });

      const res = await curSess
        .post(cfg.ep.login)
        .send({ username: 'smackgr', password: 'smackpass' });

      expect(res.status).toEqual(409);
    });

    it('should return status 400 if request is not fully populated', async () => {
      const curSess = supertest.agent(app);

      const res = await curSess.post(cfg.ep.login);

      expect(res.status).toEqual(400);
    });

    it('should return status 206 if user pass combo incorrect', async () => {
      const curSess = supertest.agent(app);

      const res = await curSess
        .post(cfg.ep.login)
        .send({ username: 's12ackgr', password: 'smackpass' });

      expect(res.status).toEqual(206);
    });

    it('should return status 206 if ', async () => {
      const curSess = supertest.agent(app);

      const res = await curSess
        .post(cfg.ep.login)
        .send({ username: 'smackgr', password: 'smackpass1231' });

      expect(res.status).toEqual(206);
    });

    it('should return status 200 if user pass combo is valid', async () => {
      const curSess = supertest.agent(app);

      const res = await curSess
        .post(cfg.ep.login)
        .send({ username: 'smackgr', password: 'smackpass' });

      expect(res.status).toEqual(200);
    });
  });
});
