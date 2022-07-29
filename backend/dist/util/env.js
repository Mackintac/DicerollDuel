"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbCon = exports.cfg = exports.env_test = exports.prod = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const { env } = process;
exports.prod = env.NODE_ENV === 'prod' ? true : false;
exports.env_test = env.NODE_ENV === 'test';
exports.cfg = {
    rootdir: __dirname + '/..',
    server: {
        port: +env.PORT,
        path: env.LOCATION,
    },
    redis: {
        password: env.REDIS_PW,
        url: `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`,
    },
    session: {
        name: env.SESSION_NAME,
        age: Number(env.SESSION_AGE),
        secret: env.SESSION_SECRET,
    },
    cors: {
        whitelist: new Set([env.WL_1, env.WL_2, undefined]),
    },
    jest: {
        sleep: 2000,
    },
    ep: {
        accounts: '/accounts',
        login: '/login',
        profile: '/profile',
    },
    bcrypt: {
        salt: 12,
        test: 1,
    },
};
exports.dbCon = {
    type: env.TYPEORM_CONNECTION,
    host: env.TYPEORM_HOST,
    port: +env.TYPEORM_PORT,
    database: env.TYPEORM_DATABASE,
    username: env.TYPEORM_USERNAME,
    password: env.TYPEORM_PASSWORD,
    entities: [],
    logging: Boolean(env.TYPEORM_LOGGING),
};
