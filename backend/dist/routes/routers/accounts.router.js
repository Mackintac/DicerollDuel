"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
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
    .put(put_account_1.PutAccount)
    .patch(put_account_1.PutAccount)
    .delete(delete_account_1.DeleteAccount);
accounts_router
    .route(env_1.cfg.ep.profile)
    .get(get_profile_1.GetProfile);
exports.default = accounts_router;
