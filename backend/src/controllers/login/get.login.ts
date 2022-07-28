import type { Request, Response } from 'express';

export async function GetLogin(req: Request, res: Response) {
  const { session } = req;
  const logged_in =
    session && session.username
      ? `You are currently logged in as ${session.username}.`
      : 'You are not logged in.';

  res.status(200).json({
    status: logged_in,
  });
}
