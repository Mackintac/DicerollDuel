import { sql } from 'src/util/util';

export const util_truncate_tables_query = sql`
truncate accounts;
`;
export const util_alter_tables_query = sql`
alter sequence accounts_id_seq restart; 
`;
export const util_insert_accounts_query = sql`
insert into accounts(username,password,email,first_name,last_name) 
values
('mackm', $1,'mgrm@gmail.com','Mackm','GRM'),
('mack', $2,'mgr@gmail.com','Mack','GR');`;

export const util_replace_account_query = sql`
insert into accounts(username,password,email,first_name,last_name)
values 
('mack', 'mackpass','mgr@gmail.com','Mack','GR');`;

export const util_delete_account_query = sql`
delete from accounts where email = 'mgr@gmail.com';`;
