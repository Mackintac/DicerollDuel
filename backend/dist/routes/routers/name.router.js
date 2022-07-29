"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const get_login_1 = require("src/controllers/login/get.login");
const name_router = (0, express_1.Router)();
name_router.route('/').get(get_login_1.GetLogin);
exports.default = name_router;
