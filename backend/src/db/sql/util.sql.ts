import { sql } from 'src/util/util';

export const util_drop_accounts_query = sql`drop table accounts;`;

export const util_insert_accounts_query = sql`
insert into accounts(username,password,email,first_name,last_name) 
values
('mackm', 'mackpassm','mgrm@gmail.com','Mackm','GRM'),
('mack', 'mackpass','mgr@gmail.com','Mack','GR');`;

export const util_replace_account_query = sql`
insert into accounts(username,password,email,first_name,last_name)
values 
('mack', 'mackpass','mgr@gmail.com','Mack','GR');`;

export const util_delete_account_query = sql`
delete from accounts where email = 'mgr@gmail.com';`;
