import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

//this is how to reach into existing type definition file 
//and make a modification to it
declare global {
  namespace Express {
    interface Request {
      //find interface of Request (which is already existing ) and add
      //in this additional property to it
      currentUser?: UserPayload
    }
  }
}

//middleware to check if user is logged in, and if so we will
//extract information from payload and set it on req.currentUser
export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  //(!req.session?.jwt) is equivalent of 
  //(!req.session || !req.session.jwt)
  if (!req.session?.jwt) {
    //if there is is no 'req.session' property or a 'req.session.jwt'
    // move on to the next middleware
    next();
  }

  try {
    const payload = jwt.verify(req.session?.jwt, process.env.JWT_SECRET!) as UserPayload;
    //TS does not recognize 'currentUser' ,need to augment what 
    //type definition is for 'req'
    req.currentUser = payload
  } catch (err) {

  }

  //have next at the end, we always want to call next , regardless of the
  //try/catch above
  next();
}