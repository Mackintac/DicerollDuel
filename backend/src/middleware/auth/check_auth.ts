import type { Request, Response, NextFunction } from 'express';

export function check_auth(
  { session, body }: Request,
  res: Response,
  next: NextFunction
) {
  console.log(body);
  if (!session || !session.username) {
    res.status(401).json({
      status: 'Not Authorized',
    });
    return;
  }

  next();
}
