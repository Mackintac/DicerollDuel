import { sql } from 'src/util/util';

export const login_query = sql`
select
  id,
  username
from accounts
where
  username = $1 
  and 
  password = $2;
  `;
