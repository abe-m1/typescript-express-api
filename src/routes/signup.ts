import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';


const router = express.Router();

router.post('/api/users/signup', [
  body('email').isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim().isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters')
],
  //do validation first, then run validateRequest next
  validateRequest,
  async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_SECRET!);

    // Store JWT on the sesssion object
    req.session = {
      jwt: userJwt
    };

    res.status(201).send(user);


  });

// rename at same time as exporting
export { router as signupRouter }

