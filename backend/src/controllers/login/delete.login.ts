import type { Request, Response } from 'express';

export function Logout(req: Request, res: Response) {
  let { session } = req;

  if (!session.username) {
    res.status(409).json({
      status: 'No account to logout.',
    });
    return;
  }

  session.destroy(() => (session.cookie.expires = new Date()));

  res.status(200).json({
    status: 'Logout Successful',
  });
}
