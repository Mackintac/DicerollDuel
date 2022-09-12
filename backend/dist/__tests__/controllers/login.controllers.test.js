"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = 'test';
const server_1 = require("src/server");
const env_1 = require("src/util/env");
const supertest_1 = __importDefault(require("supertest"));
describe('login controller integration testing suite', () => {
    describe('delete login testing', () => {
        it('should return status 409 if no session is connected', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield supertest_1.default.agent(server_1.app).delete(env_1.cfg.ep.login).send({});
            expect(res.status).toEqual(409);
        }));
        it('should return status 200 if session exists and is successfully destroyed', () => __awaiter(void 0, void 0, void 0, function* () {
            const curSess = supertest_1.default.agent(server_1.app);
            yield curSess
                .post(env_1.cfg.ep.login)
                .send({ username: 'smackgr', password: 'smackpass' });
            const res = yield curSess.delete(env_1.cfg.ep.login);
            expect(res.status).toEqual(200);
        }));
    });
    describe('get login testing', () => {
        it('should return status 200 with negative login msg', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield supertest_1.default.agent(server_1.app).get(env_1.cfg.ep.login);
            expect(JSON.parse(res.text)).toStrictEqual({
                status: 'You are not logged in.',
            });
            expect(res.status).toEqual(200);
        }));
        it('should return status 200 with positive login msg', () => __awaiter(void 0, void 0, void 0, function* () {
            const curSess = supertest_1.default.agent(server_1.app);
            yield curSess
                .post(env_1.cfg.ep.login)
                .send({ username: 'smackgr', password: 'smackpass' });
            const res = yield curSess.get(env_1.cfg.ep.login);
            expect(JSON.parse(res.text)).toStrictEqual({
                status: 'You are currently logged in as smackgr.',
            });
            expect(res.status).toEqual(200);
        }));
    });
    describe('post login testing', () => {
        it('should return status 409 if session already exists', () => __awaiter(void 0, void 0, void 0, function* () {
            const curSess = supertest_1.default.agent(server_1.app);
            yield curSess
                .post(env_1.cfg.ep.login)
                .send({ username: 'smackgr', password: 'smackpass' });
            const res = yield curSess
                .post(env_1.cfg.ep.login)
                .send({ username: 'smackgr', password: 'smackpass' });
            expect(res.status).toEqual(409);
        }));
        it('should return status 400 if request is not fully populated', () => __awaiter(void 0, void 0, void 0, function* () {
            const curSess = supertest_1.default.agent(server_1.app);
            const res = yield curSess.post(env_1.cfg.ep.login);
            expect(res.status).toEqual(400);
        }));
        it('should return status 206 if user pass combo incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
            const curSess = supertest_1.default.agent(server_1.app);
            const res = yield curSess
                .post(env_1.cfg.ep.login)
                .send({ username: 's12ackgr', password: 'smackpass' });
            expect(res.status).toEqual(206);
        }));
        it('should return status 206 if ', () => __awaiter(void 0, void 0, void 0, function* () {
            const curSess = supertest_1.default.agent(server_1.app);
            const res = yield curSess
                .post(env_1.cfg.ep.login)
                .send({ username: 'smackgr', password: 'smackpass1231' });
            expect(res.status).toEqual(206);
        }));
        it('should return status 200 if user pass combo is valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const curSess = supertest_1.default.agent(server_1.app);
            const res = yield curSess
                .post(env_1.cfg.ep.login)
                .send({ username: 'smackgr', password: 'smackpass' });
            expect(res.status).toEqual(200);
        }));
    });
});
