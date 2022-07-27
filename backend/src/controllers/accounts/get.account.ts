import type { Request, Response } from 'express';
import { AccountsModel } from 'src/db/models/Accounts.model';
import { dbq } from 'src/db/mainDB';
import { get_account_query } from 'src/db/sql/accounts.sql';

export async function GetAccount(req: Request, res: Response) {
  const { id } = req.params;
  const account = await dbq<AccountsModel>({
    query: get_account_query,
    params: [id],
  });

  if (!account) {
    res.status(404).json({
      status: 'failure',
      msg: 'Account not found in our database.',
    });
  } else {
    res.status(200).json({
      account,
      status: 'Request successful.',
    });
  }
}
