import mongoose from 'mongoose';
import { Password } from '../services/password';

// an interface that describes the properties 
// that are required to create a new user

//user attributes
interface UserAttrs {
  email: string;
  password: string;
}

// an interface that describes the properties
// that a User model has
interface UserModel extends mongoose.Model<UserDoc>{
  build(attrs: UserAttrs): UserDoc;
}

// an interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  //if JS object is being serialized , JSON.stringify() looks for a method
  //called toJSON and returns the serialized the return value from toJSON()
  //instead of the original object
  toJSON: {
    //defined as an object

    //doc - mongoose document being converted
    //ret - properties to modify, ret for returned
    transform(doc, ret){
      //remove properties we don't want to return
      delete ret.password;
      delete ret.__v;

      //want to return 'id' instead of '_id', which is very
      //specific to mongo
      ret.id = doc._id;
      delete ret._id;

    }
  }
});

//mongoose middleware function
userSchema.pre('save', async function(done){
  //we need to call 'done' when we have done all the needed
  //work inside this function

  //must use function keyword , (not an arrow function - b/c then the 
  //value of 'this' would be overwritten)
  
  //check and see if password has been modified
  if (this.isModified('password')){
    //will return true even when new user is created
    const hashed = await Password.toHash(this.get('password'))
    //'this.get' will get the user's password off the document
    this.set('password', hashed)
  }
  done();
  //call done after doing all the async work that was needed
})

//we will call function build instead of 'new User' 
// inorder to get mongoose to work well with typescript

//if we use 'new User' we won't have effective typechecking with TS

userSchema.statics.build =  (attrs: UserAttrs) => {
  //this is just an extra step
  return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
// < > generic syntax
// these are like 'functions' for types
//model<T extends Document, U extends Model> => model has 2 generic types

// model is going to return something of type UserModel

export { User };