import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';


export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  //middleware check if there if there is an error
  if (!errors.isEmpty()) {
    //return early with the error
    //whatever string you provide is assigned to err.message
    throw new RequestValidationError(errors.array())
  }

  // if we get past the if statement, call next to move to next middleware
  next();
};
