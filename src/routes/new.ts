import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../middlewares/require-auth';
import { currentUser } from '../middlewares/current-user';
import { validateRequest } from '../middlewares/validate-request';
const router = express.Router();

router.post('/api/tickets', currentUser, requireAuth, [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be greater than 0')
], validateRequest, (req: Request, res: Response) => {
  res.sendStatus(200);
});

export { router as createTicketRouter };