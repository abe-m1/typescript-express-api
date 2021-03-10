import express, { Request, Response, NextFunction } from 'express';
const finnhub = require('finnhub');

const router = express.Router();

router.get('/api/test', async (req: Request, res: Response) => {

  res.send('this is a test');


});

export { router as testRouter }