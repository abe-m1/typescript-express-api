import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
  constructor(public errors: ValidationError[]){
    super();
    //need to call super to invoke the base class

    //private will take the first property and assign it as a property
    //to the overall class

    //same as writing this.errors = errors;

    //only because we are extending a built-in class
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }
}

