import express, { Request, Response, NextFunction } from 'express';
const finnhub = require('finnhub');

const router = express.Router();

router.get('/api/stock/:symbol', async (req: Request, res: Response) => {


  const api_key = finnhub.ApiClient.instance.authentications['api_key'];
  api_key.apiKey = process.env.FINHUB_KEY // Replace this
  const finnhubClient = new finnhub.DefaultApi()

  finnhubClient.quote(req.params.symbol, (error: any, data: any, response: any) => {
    res.send(data);
  });


});

export { router as stockQuoteRouter }