import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  res.send('hi there')
});

// rename at same time as exporting
export { router as currentUserRouter }

