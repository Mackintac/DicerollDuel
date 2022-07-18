"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const env_1 = require("src/env");
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('hello world!');
});
app.listen(env_1.cfg.server.port, () => {
    console.log(`App is listening on port # ${env_1.cfg.server.port}`);
});
