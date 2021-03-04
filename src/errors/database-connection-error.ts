import { CustomError } from './custom-error'

export class DatabaseConnectionError extends CustomError {
  reason = 'Error connecting to the database';
  statusCode= 500;
  constructor(){
    super('Error connecting to the database');
    //need to call super to invoke the base class

    //private will take the first property and assign it as a property
    //to the overall class

    //same as writing this.errors = errors;

    //only because we are extending a built-in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serializeErrors(){
    return [
      { message: this.reason}
    ]
  }
}