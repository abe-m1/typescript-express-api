import express from 'express';

//handles async with express
import 'express-async-errors';
import cookieSession from 'cookie-session';
require('dotenv').config();
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { createTicketRouter } from './routes/new';

import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { currentUser } from './middlewares/current-user';

const app = express();
// if you are using a proxy
// app.set('trust proxy', true)
app.use(json());
app.use(cookieSession({
  signed: false,
  //switch to true when using https
  secure: false,
  // secure: process.env.NODE_ENV !== 'test'
}));

//FIX set current user WATCH
// app.use(currentUser);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(createTicketRouter);

//all watches for all types of requests
app.all('*', () => {
  throw new NotFoundError()
})
app.use(errorHandler);

export { app };