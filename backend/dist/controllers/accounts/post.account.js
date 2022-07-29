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
exports.PostAccount = void 0;
const mainDB_1 = require("src/db/mainDB");
const accounts_sql_1 = require("src/db/sql/accounts.sql");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_1 = require("src/util/env");
function PostAccount({ body }, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { username, password, email, first_name, last_name } = body;
        if (!username || !password || !email || !first_name || !last_name) {
            res.status(400).json({
                msg: 'All fields must be populated.',
            });
            return;
        }
        const account_check = yield (0, mainDB_1.dbq)({
            query: accounts_sql_1.check_username_or_email_query,
            params: [username, email],
        });
        if (account_check) {
            res.status(403).json({
                msg: 'Username OR Email already in use. Please use a different Username or Email.',
            });
            return;
        }
        const hashed_password = yield bcryptjs_1.default.hash(password, env_1.cfg.bcrypt.salt);
        const account = yield (0, mainDB_1.dbq)({
            query: accounts_sql_1.post_account_query,
            params: [username, hashed_password, email, first_name, last_name],
        });
        res.status(200).json({
            account,
            status: 'Request Successful.',
        });
    });
}
exports.PostAccount = PostAccount;
