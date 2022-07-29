import { sql } from 'src/util/util';

export const login_query = sql`
select
  username,
  password
from accounts
where
  username = $1 
 `;
