import type { Request, Response } from 'express';
import { AccountsModel } from 'src/db/models/Accounts.model';
import { dbq } from 'src/db/mainDB';
import {
  check_username_and_email_query,
  delete_account_query,
} from 'src/db/sql/accounts.sql';

export async function DeleteAccount({ body, session }: Request, res: Response) {
  let { email } = body;
  const { username } = session;

  if (!email) {
    res.status(400).json({
      msg: 'Must provide a valid email address.',
    });
    return;
  }

  const account_check = await dbq<AccountsModel>({
    query: check_username_and_email_query,
    params: [username!, email],
  });

  if (!account_check) {
    res.status(404).json({
      msg: 'Email and Username combination does not match. Please enter a valid Email and Username combination.',
    });
    return;
  }

  const account = await dbq<AccountsModel>({
    query: delete_account_query,
    params: [account_check.id.toString()],
  });

  res.status(200).json({
    msg: `Account: ${account.username} has been successfully Deleted.`,
    status: 'Request successful.',
  });
}
