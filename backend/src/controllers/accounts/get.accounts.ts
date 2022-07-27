import type { Request, Response } from 'express';
import { AccountsModel } from 'src/db/models/Accounts.model';
import { dbq } from 'src/db/mainDB';
import { get_accounts_query } from 'src/db/sql/accounts.sql';

export async function GetAccounts(_req: Request, res: Response) {
  const accounts = await dbq<AccountsModel[]>({
    query: get_accounts_query,
    rows: 'all',
  });

  res.status(200).json({
    accounts,
    status: 'Request successful.',
  });
}
