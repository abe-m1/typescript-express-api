import express, { Request, Response } from 'express';

//handles async with express
import 'express-async-errors';
import cookieSession from 'cookie-session';
require('dotenv').config();
import { json } from 'body-parser';
import { currentUserRouter } from './routes/auth/current-user';
import { signinRouter } from './routes/auth/signin';
import { signoutRouter } from './routes/auth/signout';
import { signupRouter } from './routes/auth/signup';
import { createTicketRouter } from './routes/tickets/new';
import { showTicketRouter } from './routes/tickets/show';
import { indexTicketRouter } from './routes/tickets/index';
import { updateTicketRouter } from './routes/tickets/update';

import { indexUserRouter } from './routes/users/index';
import { updateUsertRouter } from './routes/users/update';
import { stockQuoteRouter } from './routes/stocks/quote';
import { testRouter } from './routes/blog/index';

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
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.use(indexUserRouter);
app.use(updateUsertRouter);
app.use(stockQuoteRouter)
app.use(testRouter)

app.get('/', (req: Request, res: Response) => {
  res.send(`<h1> Stock Market API </h>
  <h3>Routes</h3>
  <p>GET ‘/api/users’</p>

  <p>POST ‘/api/users/signup’ {email, password}</p>

  <p>POST ‘/api/users/signout’</p>

  <p>POST ‘/api/users/signup’ {email, password}</p>

  <p>GET ‘/api/stock/:symbol</p>

  <h3>Routes - Protected </h3>
  <p>GET ‘api/users/currentuser</p>

  <p>PUT ‘/api/users/:id’</p>
  
  `)
})

//all watches for all types of requests
app.all('*', () => {
  throw new NotFoundError()
})
app.use(errorHandler);

export { app };