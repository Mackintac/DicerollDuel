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
exports.PutAccount = void 0;
const mainDB_1 = require("src/db/mainDB");
const accounts_sql_1 = require("src/db/sql/accounts.sql");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_1 = require("src/util/env");
function PutAccount({ body, session }, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { password, email, first_name, last_name } = body;
        const { username } = session;
        if (!email) {
            res.status(403).json({
                msg: 'Please enter a valid Email.',
            });
            return;
        }
        const account_check = yield (0, mainDB_1.dbq)({
            query: accounts_sql_1.check_username_and_email_query,
            params: [username, email],
        });
        if (!account_check) {
            res.status(403).json({
                msg: 'Email and Username combination does not match. Please enter a valid Email and Username combination.',
            });
            return;
        }
        const account = yield (0, mainDB_1.dbq)({
            query: accounts_sql_1.get_account_query,
            params: [account_check.id.toString()],
        });
        first_name = first_name ? first_name : account.first_name;
        last_name = last_name ? last_name : account.last_name;
        if (password)
            password = yield bcryptjs_1.default.hash(password, env_1.cfg.bcrypt.salt);
        else
            password = account.password;
        yield (0, mainDB_1.dbq)({
            query: accounts_sql_1.put_account_query,
            params: [account_check.id.toString(), first_name, last_name, password],
        });
        res.status(200).json({
            msg: `Details of Account: ${account.username} has been updated.`,
            status: 'Request successful.',
        });
    });
}
exports.PutAccount = PutAccount;
