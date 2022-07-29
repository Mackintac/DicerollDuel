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
exports.dbq = void 0;
const pg_1 = require("pg");
const env_1 = require("src/util/env");
const mainDB = new pg_1.Pool({
    idleTimeoutMillis: 100,
    password: env_1.dbCon.password,
    user: env_1.dbCon.username,
    database: env_1.dbCon.database,
    port: env_1.dbCon.port,
});
function dbq({ query: query_string, params: params, rows: rows, }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!params)
            params = [];
        if (!rows)
            rows = 'one';
        return (yield mainDB
            .query(query_string, params)
            .then(({ rows: qrows }) => (rows === 'all' ? qrows : qrows[0])));
    });
}
exports.dbq = dbq;
