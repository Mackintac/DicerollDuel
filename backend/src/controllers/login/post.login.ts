import type { Request, Response } from 'express';
import { dbq } from 'src/db/mainDB';
import AccountsModel from 'src/db/models/Accounts.model';
import { login_query } from 'src/db/sql/authentication.sql';

export async function PostLogin({ body, session }: Request, res: Response) {
  const { username, password } = body;

  if (!username || !password) {
    res.status(400).json({
      msg: 'All fields must be populated.',
    });
    return;
  }

  const account = await dbq<AccountsModel>({
    query: login_query,
    params: [username, password],
  });

  if (account) {
    session.username = account.username;

    res.status(200).json({
      username,
      password,
      message: 'You are now logged in!',
      status: 'Request successful.',
    });
  } else {
    res.status(202).json({
      message:
        'Your Username or Password does not exist in our database, please try again.',
      status: 'Request successful.',
    });
  }
}
