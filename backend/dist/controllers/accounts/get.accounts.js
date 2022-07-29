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
exports.GetAccounts = void 0;
const mainDB_1 = require("src/db/mainDB");
const accounts_sql_1 = require("src/db/sql/accounts.sql");
function GetAccounts(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const accounts = yield (0, mainDB_1.dbq)({
            query: accounts_sql_1.get_accounts_query,
            rows: 'all',
        });
        res.status(200).json({
            accounts,
            status: 'Request successful.',
        });
    });
}
exports.GetAccounts = GetAccounts;
