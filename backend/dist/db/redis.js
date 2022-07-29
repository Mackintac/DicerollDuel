"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.redis = void 0;
const redis_1 = require("redis");
const env_1 = require("src/util/env");
exports.redis = (0, redis_1.createClient)({
    legacyMode: true,
    url: env_1.cfg.redis.url,
});
exports.client = exports.redis;
