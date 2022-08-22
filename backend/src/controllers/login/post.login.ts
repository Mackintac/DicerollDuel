import type { Request, Response } from 'express';
import type { AccountsModel } from 'src/db/models/Accounts.model';
import { dbq } from 'src/db/mainDB';
import { login_query } from 'src/db/sql/authentication.sql';
import bc from 'bcryptjs';

export async function PostLogin({ body, session }: Request, res: Response) {
  let { username, password } = body;

  if (session && session.username) {
    res.status(409).json({
      status: 'Already logged in!',
    });
    return;
  }

  if (!username || !password) {
    res.status(400).json({
      msg: 'All fields must be populated.',
    });
    return;
  }

  const account = await dbq<AccountsModel>({
    query: login_query,
    params: [username],
  });
  if (!account) {
    res.status(206).json({
      message: 'Wrong Username or Password',
      status: 'failure',
    });
    return;
  }

  const auth = await bc.compare(password, account.password);

  if (!auth) {
    res.status(206).json({
      message: 'Wrong Username or Password',
      status: 'failure',
    });
    return;
  }
  session.username = account.username;

  res.status(200).json({
    username,
    password,
    message: 'You are now logged in!',
    status: 'Request successful.',
  });
}
