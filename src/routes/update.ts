import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { NotFoundError } from '../errors/not-found-error';
import { requireAuth } from '../middlewares/require-auth';
import { currentUser } from '../middlewares/current-user';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { Ticket } from '../models/ticket';
import { currentUserRouter } from './current-user';

const router = express.Router();

router.put('/api/tickets/:id', currentUser, requireAuth, [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be greater than 0')

],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    ticket.set({
      title: req.body.title,
      price: req.body.price
    });

    await ticket.save()

    res.send(ticket)
  });

export { router as updateTicketRouter }

