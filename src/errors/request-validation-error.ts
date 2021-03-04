import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
  statusCode = 400;
  constructor(public errors: ValidationError[]){
    super();
    //need to call super to invoke the base class

    //private will take the first property and assign it as a property
    //to the overall class

    //same as writing this.errors = errors;

    //only because we are extending a built-in class
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serializeErrors(){
    return this.errors.map(err => {
      return { message: err.msg, field: err.param};
    })
  }
}

