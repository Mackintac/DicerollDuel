import type { Request, Response } from 'express';
import { AccountsModel } from 'src/db/models/Accounts.model';
import { dbq } from 'src/db/mainDB';
import {
  check_username_or_email_query,
  post_account_query,
} from 'src/db/sql/accounts.sql';
import bc from 'bcryptjs';
import { cfg } from 'src/util/env';

export async function PostAccount({ body }: Request, res: Response) {
  let { username, password, email, first_name, last_name } = body;

  if (!username || !password || !email || !first_name || !last_name) {
    res.status(400).json({
      msg: 'All fields must be populated.',
    });
    return;
  }

  const account_check = await dbq<AccountsModel>({
    query: check_username_or_email_query,
    params: [username, email],
  });

  if (account_check) {
    res.status(403).json({
      msg: 'Username OR Email already in use. Please use a different Username or Email.',
    });
    return;
  }

  const hashed_password = await bc.hash(password, cfg.bcrypt.salt);

  const account = await dbq<AccountsModel>({
    query: post_account_query,
    params: [username, hashed_password, email, first_name, last_name],
  });

  res.status(200).json({
    account,
    status: 'Request Successful.',
  });
}
