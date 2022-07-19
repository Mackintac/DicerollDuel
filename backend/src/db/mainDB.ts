import { SQLStatement } from 'sql-template-strings';
import { Pool } from 'pg';
import { dbCon } from 'src/util/env';

const mainDB = new Pool({
  idleTimeoutMillis: 100,
  password: dbCon.password,
  user: dbCon.username,
  database: dbCon.database,
  port: dbCon.port,
});

interface DatabaseQuery {
  query: SQLStatement;
  params?: string[];
  rows?: 'one' | 'all';
}

export async function dbq<T>({
  query: query_string,
  params: params,
  rows: rows,
}: DatabaseQuery): Promise<T> {
  if (!params) params = [];
  if (!rows) rows = 'one';
  return (await mainDB
    .query(query_string, params)
    .then(({ rows: qrows }) => (rows === 'all' ? qrows : qrows[0]))) as T;
}
