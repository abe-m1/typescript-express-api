import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { Password } from '../../services/password';
import { validateRequest } from '../../middlewares/validate-request';
import { User } from '../../models/user';
import { BadRequestError } from '../../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signin',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must enter a password')
  ],
  validateRequest
  , async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Invalid credentials')
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials')
    }


    // Generate JWT
    const userJwt = jwt.sign({
      id: existingUser.id,
      email: existingUser.email
    }, process.env.JWT_SECRET!);

    // Store JWT on the sesssion object
    req.session = {
      jwt: userJwt
    };

    res.status(200).send(existingUser);





  });

// rename at same time as exporting
export { router as signinRouter }

