"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const check_auth_1 = require("src/middleware/auth/check_auth");
const get_profile_1 = require("src/controllers/accounts/get.profile");
const get_account_1 = require("src/controllers/accounts/get.account");
const get_accounts_1 = require("src/controllers/accounts/get.accounts");
const post_account_1 = require("src/controllers/accounts/post.account");
const put_account_1 = require("src/controllers/accounts/put.account");
const delete_account_1 = require("src/controllers/accounts/delete.account");
const env_1 = require("src/util/env");
const accounts_router = (0, express_1.Router)();
accounts_router.route(env_1.cfg.ep.accounts + '/:id').get(get_account_1.GetAccount);
accounts_router.route(env_1.cfg.ep.accounts).get(get_accounts_1.GetAccounts).post(post_account_1.PostAccount);
accounts_router
    .route(env_1.cfg.ep.accounts)
    .put(check_auth_1.check_auth, put_account_1.PutAccount)
    .patch(check_auth_1.check_auth, put_account_1.PutAccount)
    .delete(check_auth_1.check_auth, delete_account_1.DeleteAccount);
accounts_router
    .route(env_1.cfg.ep.profile)
    .get(check_auth_1.check_auth, get_profile_1.GetProfile);
exports.default = accounts_router;
