import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  //(!req.session?.jwt) is equivalent of 
  //(!req.session || !req.session.jwt)
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }

  //decode jwt
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_SECRET!
    );
    // if payload, send back currentUser
    res.send({ currentUser: payload });

  } catch (err) {
    res.send({ currentUser: null });
  }
});

// rename at same time as exporting
export { router as currentUserRouter }

