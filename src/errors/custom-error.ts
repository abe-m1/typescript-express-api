import { RequestValidationError } from "./request-validation-error";

export abstract class CustomError extends Error {
  //if you are going to extend abstract class you need these properties
  abstract statusCode: number;

  constructor(message: string){
    //pass message on to the Error
    super(message)

    Object.setPrototypeOf(this, CustomError.prototype)
  }

  //defining method signature
  //must return array of objects
  abstract serializeErrors(): { message: string; field?: string}[]
}