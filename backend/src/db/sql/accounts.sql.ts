import { sql } from 'src/util/util';

export const get_accounts_query = sql`
select id, username from accounts;
`;

export const get_account_query = sql`
select * from accounts 
where id = $1;
`;

export const check_username_or_email_query = sql`
select id, username, email from accounts 
where username = $1 or email = $2;
`;

export const check_username_and_email_query = sql`
select id, username, email from accounts 
where username = $1 and email = $2;
`;

export const post_user_query = sql`
insert into users(
  username,
  password
  email,
  first_name,
  last_name,
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

export const delete_account_query = sql`
delete from accounts where id = $1 
returning username;
`;

export const put_account_query = sql`
update accounts 
set 
password = $2
first_name = $3,
last_name = $4,
where id = $1;
`;
