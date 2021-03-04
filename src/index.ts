import express from 'express';

//handles async with express
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
require('dotenv').config();
import {json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
// if you are using a proxy
// app.set('trust proxy', true)
app.use(json());
app.use(cookieSession({
  signed: false,
  //switch to true when using https
  secure: false,
}))

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

//all watches for all types of requests
app.all('*', () => {
  throw new NotFoundError()
})
app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_SECRET){
    throw new Error('JWT_SECRET must be defined')
  }
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  try {
  
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log('connected')
} catch(err){
  console.log(err)
}

  app.listen(5000, ()=> {
    console.log('listening on port 5000')
  });
}

start()
