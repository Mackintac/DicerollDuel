"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.express_session = void 0;
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = require("src/db/redis");
const env_1 = require("src/util/env");
const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
exports.express_session = (0, express_session_1.default)({
    store: new RedisStore({ client: redis_1.client }),
    cookie: {
        secure: env_1.prod,
        httpOnly: env_1.prod,
        maxAge: env_1.cfg.session.age,
    },
    name: env_1.cfg.session.name,
    secret: env_1.cfg.session.secret,
    saveUninitialized: false,
    resave: false,
});
