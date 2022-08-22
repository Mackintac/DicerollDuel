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
describe('cors middleware testing suite', () => {
    it('should return negative access message', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app)
            .get(env_1.cfg.ep.accounts)
            .set('Origin', '10321214321.412');
        expect(res.status).toBe(500);
    }));
    it('should return negative access message', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).get(env_1.cfg.ep.accounts);
        expect(res.status).toBe(200);
    }));
});
