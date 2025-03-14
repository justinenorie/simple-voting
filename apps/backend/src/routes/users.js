import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => {
  const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'BobMarley', email: 'marley@example.com' },
  ];
  res.json(users)
});

export default router;
