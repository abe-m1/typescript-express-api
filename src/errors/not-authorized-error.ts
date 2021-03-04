import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  //401 forbidden
  statusCode = 401;

  constructor() {
    super('Not Authorized')

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not Authorized' }];
  }
}