"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mw_cors = void 0;
const cors_1 = __importDefault(require("cors"));
const env_1 = require("src/util/env");
exports.mw_cors = (0, cors_1.default)({
    optionsSuccessStatus: 200,
    origin: (origin, fn) => {
        if (env_1.cfg.cors.whitelist.has(origin))
            return fn(null, origin);
        else
            return fn('Not Allowed By CORS', origin);
    },
    credentials: true,
});
