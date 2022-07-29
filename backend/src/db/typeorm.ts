import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { models } from 'src/db/models';
import { cfg, dbCon, prod } from 'src/util/env';
import { dbq } from 'src/db/mainDB';
import {
  util_alter_tables_query,
  util_insert_accounts_query,
  util_truncate_tables_query,
} from 'src/db/sql/util.sql';
import bc from 'bcryptjs';

/**
 * Usage of @function TypeOrmPGInit
 * When in "dev" NODE_ENV this method will:
 * 1: Go forward with dropping the "accounts" table,
 * 2: Recreate the "accounts" table,
 * 3: Repopulate it with preset values.
 *
 * DO NOT RUN IN A DEV ENVIRONMENT IF YOU WANT DATABASE DATA TO PERSIST
 */
export async function TypeOrmPGInit() {
  const DS = new DataSource({
    ...dbCon,
    entities: await models,
  });

  await DS.initialize();
  await DS.synchronize();

  //End of base initialization when in a production NODE_ENV
  if (prod) return;

  // DEV & TESTING ENV CODE
  const passwords = [
    await bc.hash('mackm', cfg.bcrypt.test),
    await bc.hash('mack', cfg.bcrypt.test),
  ];

  // resets and seeds tables as needed for repeatable testing
  await dbq({ query: util_truncate_tables_query });
  await dbq({ query: util_alter_tables_query });

  await dbq({
    query: util_insert_accounts_query,
    params: passwords,
  });

  console.log('DEV ENV DB connected\n DB populated');
  return;
}
