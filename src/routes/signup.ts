import express from 'express';

const router = express.Router();

router.post('/api/users/signup', (req, res) => {
  res.send('hi there')
});

// rename at same time as exporting
export { router as signupRouter }

