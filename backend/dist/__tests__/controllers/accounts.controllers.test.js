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
const supertest_1 = __importDefault(require("supertest"));
const env_1 = require("src/util/env");
const util_sql_1 = require("src/db/sql/util.sql");
const mainDB_1 = require("src/db/mainDB");
describe('ep testing /Accounts', () => {
    describe('Delete Account request testing', () => {
        it('status should return 400 if no email in body', () => __awaiter(void 0, void 0, void 0, function* () {
            const account = supertest_1.default.agent(server_1.app);
            yield account
                .post(env_1.cfg.ep.login)
                .send({ username: 'smackgr', password: 'smackpass' });
            const res = yield account
                .delete(env_1.cfg.ep.accounts)
                .send({ username: 'mackm' });
            expect(res.status).toBe(400);
        }));
        it('status should return 404 if username/email do not match', () => __awaiter(void 0, void 0, void 0, function* () {
            const account = supertest_1.default.agent(server_1.app);
            yield account
                .post(env_1.cfg.ep.login)
                .send({ username: 'smackgr', password: 'smackpass' });
            const res = yield account.delete(env_1.cfg.ep.accounts).send({
                username: 'smackgr',
                email: 'dsadsadsa@gmail.com',
            });
            expect(res.status).toEqual(404);
        }));
        it('status should return 200 if username/email DO match', () => __awaiter(void 0, void 0, void 0, function* () {
            const account = supertest_1.default.agent(server_1.app);
            yield account
                .post(env_1.cfg.ep.login)
                .send({ username: 'smackgr', password: 'smackpass' });
            const res = yield account.delete(env_1.cfg.ep.accounts).send({
                username: 'smackgr',
                email: 'mackintac@mack.com',
            });
            expect(res.status).toEqual(200);
        }));
    });
    describe('Post Account request testing', () => {
        it('status should return 400 if body is incomplete', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server_1.app).post(env_1.cfg.ep.accounts).send({
                email: 'mackintac@mack.com',
                first_name: 'Mike',
                last_name: 'Jeff',
            });
            expect(res.status).toEqual(400);
        }));
        it('status should return 403 if information already exists on db', () => __awaiter(void 0, void 0, void 0, function* () {
            const account = (0, supertest_1.default)(server_1.app);
            yield account.post(env_1.cfg.ep.accounts).send({
                username: 'smackgr',
                password: 'smackpass',
                email: 'mackintac@mack.com',
                first_name: 'Mike',
                last_name: 'Jeff',
            });
            const res = yield account.post(env_1.cfg.ep.accounts).send({
                username: 'smackgr',
                password: 'smackpass',
                email: 'mackintac@mack.com',
                first_name: 'Mike',
                last_name: 'Jeff',
            });
            expect(res.status).toEqual(403);
        }));
        it('status should be 200 with all fields populated', () => __awaiter(void 0, void 0, void 0, function* () {
            const account = (0, supertest_1.default)(server_1.app);
            const res = yield account.post(env_1.cfg.ep.accounts).send({
                username: 'smackga',
                password: 'smackpasa',
                email: 'mackintac@mack.cam',
                first_name: 'Miks',
                last_name: 'Jefa',
            });
            expect(res.status).toEqual(200);
            yield (0, mainDB_1.dbq)({ query: util_sql_1.util_delete_account_query });
        }));
    });
    describe('Get account and get accounts request testing', () => {
        it('should return 404 status if account does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server_1.app).get(env_1.cfg.ep.accounts + '/7');
            expect(res.status).toEqual(404);
        }));
        it('should return 200 status if account DOES exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server_1.app).get(env_1.cfg.ep.accounts + '/1');
            expect(res.status).toEqual(200);
        }));
        it('should return 200 status and json object', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server_1.app).get(env_1.cfg.ep.accounts);
            expect(JSON.parse(res.text)).toBeInstanceOf(Object);
            expect(res.status).toEqual(200);
        }));
    });
    describe('Profile EP testing', () => {
        it('should return 200 status and json object', () => __awaiter(void 0, void 0, void 0, function* () {
            const account = supertest_1.default.agent(server_1.app);
            yield account
                .post(env_1.cfg.ep.login)
                .send({ username: 'smackgr', password: 'smackpass' });
            const res = yield account.get(env_1.cfg.ep.profile);
            expect(JSON.parse(res.text)).toBeInstanceOf(Object);
            expect(res.status).toEqual(200);
        }));
    });
    describe('Put Account request testing', () => {
        it('should return status 403 with lack of email', () => __awaiter(void 0, void 0, void 0, function* () {
            const account = supertest_1.default.agent(server_1.app);
            yield account
                .post(env_1.cfg.ep.login)
                .send({ username: 'smackgr', password: 'smackpass' });
            const res = yield account.put(env_1.cfg.ep.accounts).send({
                username: 'smackgr',
                password: 'smackpas',
                first_name: 'Mike',
                last_name: 'Jeff',
            });
            expect(res.status).toEqual(403);
        }));
        it('should return status 403 with lack of matching email', () => __awaiter(void 0, void 0, void 0, function* () {
            const account = supertest_1.default.agent(server_1.app);
            yield account
                .post(env_1.cfg.ep.login)
                .send({ username: 'smackgr', password: 'smackpass' });
            const res = yield account.put(env_1.cfg.ep.accounts).send({
                username: 'smackgr',
                password: 'smackpas',
                email: 'mackack.com',
                first_name: 'Mike',
                last_name: 'Jeff',
            });
            expect(res.status).toEqual(403);
        }));
        it('should return status 200 with valid username/password combo', () => __awaiter(void 0, void 0, void 0, function* () {
            const account = supertest_1.default.agent(server_1.app);
            yield account
                .post(env_1.cfg.ep.login)
                .send({ username: 'smackgr', password: 'smackpass' });
            const res = yield account.put(env_1.cfg.ep.accounts).send({
                username: 'smackgr',
                password: 'smackpass',
                email: 'mackintac@mack.com',
                first_name: 'Mike',
                last_name: 'Jeff',
            });
            expect(res.status).toEqual(200);
        }));
        it('should STILL return status 200 with firstname, lastname, and password excluded from json body ', () => __awaiter(void 0, void 0, void 0, function* () {
            const account = supertest_1.default.agent(server_1.app);
            yield account
                .post(env_1.cfg.ep.login)
                .send({ username: 'smackgr', password: 'smackpass' });
            const res = yield account.put(env_1.cfg.ep.accounts).send({
                username: 'smackgr',
                email: 'mackintac@mack.com',
            });
            expect(res.status).toEqual(200);
        }));
    });
});
