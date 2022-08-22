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
exports.TypeOrmPGInit = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const models_1 = require("src/db/models");
const env_1 = require("src/util/env");
const mainDB_1 = require("src/db/mainDB");
const util_sql_1 = require("src/db/sql/util.sql");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function TypeOrmPGInit() {
    return __awaiter(this, void 0, void 0, function* () {
        const DS = new typeorm_1.DataSource(Object.assign(Object.assign({}, env_1.dbCon), { entities: yield models_1.models }));
        yield DS.initialize();
        yield DS.synchronize();
        if (env_1.prod)
            return;
        const passwords = [
            yield bcryptjs_1.default.hash('mackm', env_1.cfg.bcrypt.test),
            yield bcryptjs_1.default.hash('smackpass', env_1.cfg.bcrypt.test),
            yield bcryptjs_1.default.hash('mack', env_1.cfg.bcrypt.test),
        ];
        yield (0, mainDB_1.dbq)({ query: util_sql_1.util_truncate_tables_query });
        yield (0, mainDB_1.dbq)({ query: util_sql_1.util_alter_tables_query });
        yield (0, mainDB_1.dbq)({
            query: util_sql_1.util_insert_accounts_query,
            params: passwords,
        });
        console.log('DEV ENV DB connected\n DB populated');
        return;
    });
}
exports.TypeOrmPGInit = TypeOrmPGInit;
