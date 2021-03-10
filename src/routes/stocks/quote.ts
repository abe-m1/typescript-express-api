import express, { Request, Response, NextFunction } from 'express';
const finnhub = require('finnhub');

const router = express.Router();

router.get('/api/stock/:symbol', async (req: Request, res: Response) => {


  const api_key = finnhub.ApiClient.instance.authentications['api_key'];
  api_key.apiKey = process.env.FINHUB_KEY // Replace this
  const finnhubClient = new finnhub.DefaultApi()
  console.log(req.params.symbol)
  finnhubClient.quote((req.params.symbol).toUpperCase().toString(), (error: any, data: any, response: any) => {
    console.log(error, data)
    res.send(data);
  });

  // finnhubClient.companyNews("AAPL", "2020-01-01", "2020-05-01", (error: any, data: any, response: any) => {
  //   if (error) {
  //     console.error(error);
  //   } else {
  //     console.log(data, response)
  //   }
  // });


});

export { router as stockQuoteRouter }