import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

//middleware to reject the request if the user is not logged in

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  //we are assuming here that currentUser middleware has already run
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
}
