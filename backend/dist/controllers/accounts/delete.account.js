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
exports.DeleteAccount = void 0;
const mainDB_1 = require("src/db/mainDB");
const accounts_sql_1 = require("src/db/sql/accounts.sql");
function DeleteAccount({ body, session }, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { email } = body;
        const { username } = session;
        if (!email) {
            res.status(400).json({
                msg: 'Must provide a valid email address.',
            });
            return;
        }
        const account_check = yield (0, mainDB_1.dbq)({
            query: accounts_sql_1.check_username_and_email_query,
            params: [username, email],
        });
        if (!account_check) {
            res.status(404).json({
                msg: 'Email and Username combination does not match. Please enter a valid Email and Username combination.',
            });
            return;
        }
        const account = yield (0, mainDB_1.dbq)({
            query: accounts_sql_1.delete_account_query,
            params: [account_check.id.toString()],
        });
        res.status(200).json({
            msg: `Account: ${account.username} has been successfully Deleted.`,
            status: 'Request successful.',
        });
    });
}
exports.DeleteAccount = DeleteAccount;
