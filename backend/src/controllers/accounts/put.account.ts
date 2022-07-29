import type { Request, Response } from 'express';
import { AccountsModel } from 'src/db/models/Accounts.model';
import { dbq } from 'src/db/mainDB';
import {
  check_username_and_email_query,
  get_account_query,
  put_account_query,
} from 'src/db/sql/accounts.sql';
import bc from 'bcryptjs';
import { cfg } from 'src/util/env';

export async function PutAccount({ body, session }: Request, res: Response) {
  let { password, email, first_name, last_name } = body;
  const { username } = session;

  if (!email) {
    res.status(403).json({
      msg: 'Please enter a valid Email.',
    });
    return;
  }

  const account_check = await dbq<AccountsModel>({
    query: check_username_and_email_query,
    params: [username!, email],
  });

  if (!account_check) {
    res.status(403).json({
      msg: 'Email and Username combination does not match. Please enter a valid Email and Username combination.',
    });
    return;
  }

  const account = await dbq<AccountsModel>({
    query: get_account_query,
    params: [account_check.id.toString()],
  });

  first_name = first_name ? first_name : account.first_name;
  last_name = last_name ? last_name : account.last_name;

  if (password) password = await bc.hash(password, cfg.bcrypt.salt);
  else password = account.password;

  await dbq<AccountsModel>({
    query: put_account_query,
    params: [account_check.id.toString(), first_name, last_name, password],
  });

  res.status(204).json({
    msg: `Details of Account: ${account.username} has been updated.`,
    status: 'Request successful.',
  });
}
