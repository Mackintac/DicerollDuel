"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_query = void 0;
const util_1 = require("src/util/util");
exports.login_query = (0, util_1.sql) `
select
  username,
  password
from accounts
where
  username = $1 
 `;
