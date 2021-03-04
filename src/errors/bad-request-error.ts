import { CustomError } from './custom-error'

//General Purpose Error
export class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(public message: string){
    super(message)

    Object.setPrototypeOf(this, BadRequestError.prototype)
  }

  serializeErrors(){
    return [ {
      message: this.message
    }]
  }
}