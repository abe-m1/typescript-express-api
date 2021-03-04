export class DatabaseConnectionError extends Error {
  reason = 'Error connecting to the database'
  constructor(){
    super();
    //need to call super to invoke the base class

    //private will take the first property and assign it as a property
    //to the overall class

    //same as writing this.errors = errors;

    //only because we are extending a built-in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }
}