import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';
import { NotFoundError } from '../../errors/not-found-error';
import { requireAuth } from '../../middlewares/require-auth';
import { currentUser } from '../../middlewares/current-user';
import { NotAuthorizedError } from '../../errors/not-authorized-error';
import { User } from '../../models/user';


const router = express.Router();

router.put('/api/users/:id', currentUser, requireAuth, [
  // body('title')
  //   .not()
  //   .isEmpty()
  //   .withMessage('Title is required'),
  // body('price')
  //   .isFloat({ gt: 0 })
  //   .withMessage('Price must be greater than 0')

],
  // validateRequest,
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new NotFoundError();
    }

    if (user.id !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    user.set({
      location: req.body.location
    });

    await user.save()

    res.send(user)
  });

export { router as updateUsertRouter }