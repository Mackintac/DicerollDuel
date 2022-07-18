"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cfg = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const { env } = process;
exports.cfg = {
    server: { port: env.PORT },
};
