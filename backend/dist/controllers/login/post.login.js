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
exports.PostLogin = void 0;
const mainDB_1 = require("src/db/mainDB");
const authentication_sql_1 = require("src/db/sql/authentication.sql");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function PostLogin({ body, session }, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { username, password } = body;
        if (session && session.username) {
            res.status(409).json({
                status: 'Already logged in!',
            });
            return;
        }
        if (!username || !password) {
            res.status(400).json({
                msg: 'All fields must be populated.',
            });
            return;
        }
        const account = yield (0, mainDB_1.dbq)({
            query: authentication_sql_1.login_query,
            params: [username],
        });
        if (!account) {
            res.status(206).json({
                message: 'Wrong Username or Password',
                status: 'failure',
            });
            return;
        }
        const auth = yield bcryptjs_1.default.compare(password, account.password);
        if (!auth) {
            res.status(206).json({
                message: 'Wrong Username or Password',
                status: 'failure',
            });
            return;
        }
        session.username = account.username;
        res.status(200).json({
            username,
            password,
            message: 'You are now logged in!',
            status: 'Request successful.',
        });
    });
}
exports.PostLogin = PostLogin;
