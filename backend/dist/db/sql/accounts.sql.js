"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.put_account_query = exports.delete_account_query = exports.post_account_query = exports.check_username_and_email_query = exports.check_username_or_email_query = exports.get_account_query = exports.get_accounts_query = void 0;
const util_1 = require("src/util/util");
exports.get_accounts_query = (0, util_1.sql) `
select id, username from accounts;
`;
exports.get_account_query = (0, util_1.sql) `
select * from accounts 
where id = $1;
`;
exports.check_username_or_email_query = (0, util_1.sql) `
select id, username, email from accounts 
where username = $1 or email = $2;
`;
exports.check_username_and_email_query = (0, util_1.sql) `
select id, username, email from accounts 
where username = $1 and email = $2;
`;
exports.post_account_query = (0, util_1.sql) `
insert into accounts(
  username,
  password,
  email,
  first_name,
  last_name
)
values(
  $1,
  $2,
  $3,
  $4,
  $5
) 
returning username;
`;
exports.delete_account_query = (0, util_1.sql) `
delete from accounts where id = $1 
returning username;
`;
exports.put_account_query = (0, util_1.sql) `
update accounts 
set 
first_name = $2,
last_name = $3,
password = $4 
where id = $1;
`;
