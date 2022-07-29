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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("module-alias/register");
const env_1 = require("src/util/env");
const server_1 = require("src/server");
const typeorm_1 = require("src/db/typeorm");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, typeorm_1.TypeOrmPGInit)();
        console.log('redis connected');
        server_1.app.listen(env_1.cfg.server.port, () => console.log('live @ ' + env_1.cfg.server.path + env_1.cfg.server.port));
    }
    catch (error) {
        console.log(error.message);
    }
}))();
