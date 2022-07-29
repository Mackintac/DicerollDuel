"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.util_delete_account_query = exports.util_replace_account_query = exports.util_insert_accounts_query = exports.util_alter_tables_query = exports.util_truncate_tables_query = void 0;
const util_1 = require("src/util/util");
exports.util_truncate_tables_query = (0, util_1.sql) `
truncate accounts;
`;
exports.util_alter_tables_query = (0, util_1.sql) `
alter sequence accounts_id_seq restart; 
`;
exports.util_insert_accounts_query = (0, util_1.sql) `
insert into accounts(username,password,email,first_name,last_name) 
values
('mackm', $1,'mgrm@gmail.com','Mackm','GRM'),
('mack', $2,'mgr@gmail.com','Mack','GR');`;
exports.util_replace_account_query = (0, util_1.sql) `
insert into accounts(username,password,email,first_name,last_name)
values 
('mack', 'mackpass','mgr@gmail.com','Mack','GR');`;
exports.util_delete_account_query = (0, util_1.sql) `
delete from accounts where email = 'mgr@gmail.com';`;
