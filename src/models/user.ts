import mongoose from 'mongoose';

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
});

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